const path = require('path')
const designs = require('@freesewing/pattern-info').list
const measurements = require('@freesewing/models').measurements.womenswear
const i18n = require('@freesewing/i18n')
const routes = require('./gatsby-routes')
const options = require('@freesewing/pattern-info').options

// Expose some variables set by Netlify to send to Bugsnag
process.env.GATSBY_NETLIFY = process.env.NETLIFY
process.env.GATSBY_NETLIFY_BUILD_ID = process.env.BUILD_ID
process.env.GATSBY_NETLIFY_CONTEXT = process.env.CONTEXT
process.env.GATSBY_NETLIFY_REPOSITORY_URL = process.env.REPOSITORY_URL
process.env.GATSBY_NETLIFY_BRANCH = process.env.BRANCH
process.env.GATSBY_NETLIFY_COMMIT_REF = process.env.COMMIT_REF

const translate = (id) =>
  i18n.strings[process.env.GATSBY_LANGUAGE][id] || `No translation for ${id}`

const slugChunks = (slug) => {
  const chunks = []
  for (const chunk of slug.split('/')) {
    if (chunk.length > 0) chunks.push(chunk)
  }

  return chunks
}

const slugFromFilePath = (filePath) => {
  return (
    '/' +
    filePath
      .match(/[\/|\\]markdown[\/|\\]org[\/|\\](.*)/)
      .pop()
      .slice(0, -5)
  )
}

const mdxQuery = function (type, language) {
  let sort = type === 'docs' ? 'fileAbsolutePath' : 'frontmatter___date'
  return `{
    allMdx(
      filter: { fileAbsolutePath: { regex: "//${type}/[^.]*/${language}.md/" } }
      sort: { fields: [${sort}], order: DESC }
    ) { edges { node {
      fileAbsolutePath
      frontmatter {
        title
        date
        order
      }
    } } }
  }`
}

const strapiQuery = {
  showcase: `{
    allShowcasePost {
      nodes {
        order
        post {
          title
          slug
        }
      }
    }
  }`,
  blog: `{
    allBlogPost {
      nodes {
        order
        post {
          slug
          title
        }
      }
    }
  }`,
}

const newsletterQuery = () => `{
  allMdx(
    filter: {fields: {source: {eq: "newsletter"}}}
    sort: { fields: [fileAbsolutePath], order: DESC }
  ) {
    edges {
      node {
        fileAbsolutePath
        parent {
          ... on File {
            relativeDirectory
          }
        }
      }
    }
  }
}`

// Gets the page title for a given slug
const pageTitle = (slug, page) => {
  if (!page.frontmatter || !page.frontmatter.title) {
    let chunks = slugChunks(slug)
    // Perhaps a pattern option or sub page
    if (chunks[0] === 'docs' && chunks[1] === 'patterns') {
      if (chunks.length === 5 && chunks[3] === 'options') {
        // This is a pattern option
        for (let option of options[chunks[2]]) {
          if (option.toLowerCase() === chunks[4])
            return translate(`options.${chunks[2]}.${option}.title`)
        }
      }
      if (chunks.length === 4) {
        // Perhaps a pattern subpage
        if (chunks[3] === 'options') return translate('app.patternOptions')
        if (chunks[3] === 'measurements') return translate('app.requiredMeasurements')
        if (chunks[3] === 'needs') return translate('app.whatYouNeed')
        if (chunks[3] === 'fabric') return translate('app.fabricOptions')
        if (chunks[3] === 'cutting') return translate('app.cutting')
        if (chunks[3] === 'instructions') return translate('app.instructions')
      } else if (chunks.length === 3) return translate(`patterns.${chunks[2]}.title`)
    }
  }

  return page.frontmatter.linktitle ? page.frontmatter.linktitle : page.frontmatter.title
}

const createMdxPages = async function (pages, createPage, graphql, language) {
  let types = ['docs']
  let promises = []
  for (let type of types) {
    pages[type] = {}
    let query = mdxQuery(type, language)
    let component = path.resolve(`./src/pages/${type}/_mdx.js`)
    await graphql(query).then((res) => {
      if (typeof res.data === 'undefined') throw 'query failed ' + query
      else {
        for (let page of res.data.allMdx.edges) {
          let slug = slugFromFilePath(page.node.fileAbsolutePath)
          pages[type][slug] = {
            path: slug,
            component,
            context: {
              slug,
              title: pageTitle(slug, page.node),
              order: page.node.frontmatter.order,
              // Keep file here, it is used in the page query to filter
              file: page.node.fileAbsolutePath,
            },
          }
          // Handle duplicates in docs
          if (type === 'docs' && typeof routes.duplicates[slug] !== 'undefined') {
            for (let newSlug of routes.duplicates[slug]) {
              pages[type][newSlug] = {
                path: newSlug,
                component,
                context: {
                  slug: newSlug,
                  title: pages.docs[slug].context.title,
                  order: pages.docs[slug].context.order,
                  // Keep file here, it is used in the page query to filter
                  file: pages.docs[slug].context.file,
                },
              }
            }
          }
        }
      }
      for (let slug in pages[type]) {
        promises.push(
          new Promise((resolve, reject) => {
            createPage(pages[type][slug])
            resolve(true)
          })
        )
      }
    })
  }

  return Promise.all(promises)
}

const createStrapiPages = async function (pages, createPage, graphql, language) {
  let types = ['blog', 'showcase']
  let promises = []
  for (let type of types) {
    pages[type] = {}
    let query = strapiQuery[type]
    let component = path.resolve(`./src/pages/${type}/_strapi.js`)
    await graphql(query).then((res) => {
      if (typeof res.data === 'undefined') throw 'query failed ' + query
      else {
        for (let page of res.data[type === 'blog' ? 'allBlogPost' : 'allShowcasePost'].nodes) {
          let slug = `/${type}/${page.post.slug}/`
          pages[type][slug] = {
            path: slug,
            component,
            context: {
              slug,
              title: page.title,
              order: page.order,
              slugId: page.post.slug,
            },
          }
        }
      }
      for (let slug in pages[type]) {
        promises.push(
          new Promise((resolve, reject) => {
            createPage(pages[type][slug])
            resolve(true)
          })
        )
      }
    })
  }

  return Promise.all(promises)
}

const createNewsletterPages = async function (pages, createPage, graphql, language) {
  let promises = []
  pages = {}
  let query = newsletterQuery()
  let component = path.resolve(`./src/pages/newsletter/_mdx.js`)
  await graphql(query).then((res) => {
    if (typeof res.data === 'undefined') throw 'query failed ' + query
    else {
      for (let page of res.data.allMdx.edges) {
        let slug = `/newsletter/${page.node.parent.relativeDirectory}/`
        pages[slug] = {
          path: slug,
          component,
          context: {
            // Keep file here, it is used in the page query to filter
            file: page.node.fileAbsolutePath,
          },
        }
      }
    }
    for (let slug in pages) {
      console.log('Creating', slug)
      promises.push(
        new Promise((resolve, reject) => {
          createPage(pages[slug])
          resolve(true)
        })
      )
    }
  })

  return Promise.all(promises)
}

const createPerDesignPages = async function (createPage, language) {
  let promises = []
  for (let design of designs) {
    for (let match in routes.perDesign.single) {
      promises.push(
        new Promise((resolve, reject) => {
          createPage({
            path: match.replace('_design', design),
            component: path.resolve(`./src/pages/${routes.perDesign.single[match]}`),
            context: { design },
          })
          resolve(true)
        })
      )
    }
    for (let m in routes.perDesign.multiple) {
      let match = m.replace('_design', design)
      promises.push(
        new Promise((resolve, reject) => {
          createPage({
            path: match.slice(0, -1),
            matchPath: match,
            component: path.resolve(`./src/pages/${routes.perDesign.multiple[m]}`),
            context: {
              design,
              // This is required because string interpolation is not allowed in page graphql queries
              optionsMdxRegex: `//docs/patterns/${design}/options/[^/]*/${language}.md/`,
              settingsMdxRegex: `//docs/draft/settings/${language}.md/`,
            },
          })
          resolve(true)
        })
      )
    }
  }

  return Promise.all(promises)
}

const createPerMeasurementPages = async function (createPage, language) {
  let promises = []
  for (let measurement of measurements) {
    for (let m in routes.perMeasurement.multiple) {
      let match = m.replace('_measurement', measurement).toLowerCase()
      promises.push(
        new Promise((resolve, reject) => {
          createPage({
            path: match.slice(0, -1),
            matchPath: match,
            component: path.resolve(`./src/pages/${routes.perMeasurement.multiple[m]}`),
            context: {
              measurement,
              // This is required because string interpolation is not allowed in page graphql queries
              measurementsMdxRegex: `//docs/measurements/${measurement.toLowerCase()}/${language}.md/`,
            },
          })
          resolve(true)
        })
      )
    }
  }

  return Promise.all(promises)
}

const createDynamicPages = async function (createPage) {
  let promises = []
  for (let match in routes.dynamic) {
    promises.push(
      new Promise((resolve, reject) => {
        createPage({
          path: match.slice(0, -1),
          matchPath: match,
          component: path.resolve(`./src/pages/${routes.dynamic[match]}`),
        })
        resolve(true)
      })
    )
  }

  return Promise.all(promises)
}

const createRedirects = async function (createRedirect) {
  let promises = []
  for (let from in routes.redirect) {
    promises.push(
      new Promise((resolve, reject) => {
        createRedirect({
          fromPath: from,
          toPath: routes.redirect[from],
          isPermanent: true,
          redirectInBrowser: true,
        })
        resolve(true)
      })
    )
  }

  return Promise.all(promises)
}

exports.createPages = async ({ actions, graphql }) => {
  // Without a language, this won't work
  const language = process.env.GATSBY_LANGUAGE
  if (typeof language === 'undefined')
    throw new Error("You MUST set the GATSBY_LANGUAGE environment variable (to 'en' for example)")

  const pages = {}
  await createMdxPages(pages, actions.createPage, graphql, language)
  await createNewsletterPages(pages, actions.createPage, graphql, language)
  await createStrapiPages(pages, actions.createPage, graphql, language)

  await createPerDesignPages(actions.createPage, language)
  await createPerMeasurementPages(actions.createPage, language)
  await createDynamicPages(actions.createPage)

  await createRedirects(actions.createRedirect)

  return
}

const getStrapiPosts = async (type, lang) => {
  const host = 'https://posts.freesewing.org'
  const languages = ['en', 'de', 'es', 'fr', 'nl']
  const buildUrl = (type, lang) =>
    type === 'blog'
      ? `${host}/blogposts?_locale=${lang}&_sort=date:ASC&dev_ne=true`
      : `${host}/showcaseposts?_locale=${lang}&_sort=date:ASC`

  let res
  try {
    res = await axios.get(buildUrl(type, lang))
  } catch (err) {
    console.log(err)
  }
  const posts = {}
  //const paths = []
  for (const post of res.data) {
    posts[post.slug] = post
    //paths.push(`/${type}/${post.slug}`)
  }

  //return [paths, posts]
  return posts
}

/* Source nodes from backend */
const axios = require(`axios`)
const crypto = require(`crypto`)
exports.sourceNodes = async ({ actions, getNode, createNodeId, hasNodeChanged }) => {
  const { createNode } = actions

  /* Backend patron nodes */
  // Do the initial fetch
  const result = await axios.get(process.env.GATSBY_BACKEND + 'patrons')
  // Create patron nodes.
  let i = 0
  Object.keys(result.data).forEach((tier) => {
    result.data[tier].map((patron) => {
      const patronNode = {
        id: createNodeId(patron.handle),
        parent: null,
        patron: {
          ...patron,
          tier: tier,
        },
        internal: {
          type: `FSPatron`,
        },
        order: i,
      }
      i++

      // Get content digest of node.
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(patronNode))
        .digest(`hex`)

      patronNode.internal.contentDigest = contentDigest
      createNode(patronNode)
    })
  })

  /* Strapi blog post nodes */
  for (const type of ['blog', 'showcase']) {
    const posts = await getStrapiPosts(type, process.env.GATSBY_LANGUAGE)
    i = 0
    Object.keys(posts).map((postId) => {
      const post = posts[postId]
      const strapiNode = {
        id: createNodeId(post._id),
        parent: null,
        post: { ...post },
        internal: {
          type: `${type}Post`,
        },
        order: i,
      }
      i++

      // Get content digest of node.
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(strapiNode))
        .digest(`hex`)

      strapiNode.internal.contentDigest = contentDigest
      createNode(strapiNode)
    })
  }

  return
}
