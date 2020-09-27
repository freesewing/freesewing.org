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

const decorateTree = (tree, chunks, slug, page) => {
  let index
  if (chunks.length === 0) return tree
  else {
    index = chunks.shift()
    if (chunks.length === 0) {
      tree[index] = {
        title: page.context.title,
        linktitle: page.context.linktitle,
        slug
      }
    } else {
      if (typeof tree[index] === 'undefined') tree[index] = { offspring: {} }
      else if (typeof tree[index].offspring === 'undefined') tree[index].offspring = {}
    }
  }

  return decorateTree(tree[index].offspring, chunks, slug, page)
}

const buildTree = (pages) => {
  let tree = {}
  for (let slug of Object.keys(pages).sort()) {
    addToTree(slug, pages[slug], tree)
  }

  return tree
}

const addToTree = function (slug, page, tree) {
  decorateTree(tree, slugChunks(slug), slug, page)
}

const getFromTree = (tree, chunks) => {
  if (chunks.length === 0) return []
  const index = chunks.shift()
  if (chunks.length === 0) {
    if (!tree[index].offspring) return []
    else return Object.keys(tree[index].offspring).map((child) => tree[index].offspring[child].slug)
  }

  return getFromTree(tree[index].offspring, chunks)
}

const getOffspring = (slug, pages, tree) => {
  let offspring = {}
  for (const child of getFromTree(tree, slugChunks(slug)))
    offspring[child] = pages[child].context.title

  return offspring
}

const getSiblings = (slug, pages, tree) => getOffspring(getParentSlug(slug), pages, tree)

const getNextChild = (slug, docs) =>
  docs[slug].context.offspring ? Object.keys(docs[slug].context.offspring).shift() : false

const getNextSibling = (slug, docs) => {
  let me = false
  if (docs[slug] && docs[slug].context.siblings) {
    for (let sib in docs[slug].context.siblings) {
      if (me) return sib
      if (sib === slug) me = true
    }
  }

  return false
}

const getLastChild = (slug, docs) => {
  if (docs[slug] && docs[slug].context.offspring)
    return getLastChild(Object.keys(docs[slug].context.offspring).shift(), docs)

  return slug
}

const getParentSlug = (slug) => slug.split('/').slice(0, -2).join('/') + '/'
const getNextParent = (slug, docs) => getNextSibling(getParentSlug(slug), docs)

const getNextDoc = (slug, docs) => {
  let next
  next = getNextChild(slug, docs)
  if (!next) next = getNextSibling(slug, docs)
  if (!next) next = getNextParent(slug, docs)
  if (!next) next = '/docs/about/' // last resort

  return [next, { slug: next, title: docs[next].context.title }]
}

const topDocsCrumb = {
  slug: '/docs',
  title: translate('app.docs')
}

const getDocCrumbs = (slug, docs, crumbs = false) => {
  let len = slugChunks(slug).length
  // First pass
  if (!crumbs) {
    if (len < 3) return [topDocsCrumb]
    return getDocCrumbs(getParentSlug(slug), docs, [])
  }
  // Recursion
  crumbs.push({
    slug,
    title: docs[slug].context.title
  })

  return len < 3
    ? [...crumbs, topDocsCrumb].reverse()
    : getDocCrumbs(getParentSlug(slug), docs, crumbs)
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
        ${type === 'blog' ? 'linktitle' : ''}
      }
    } } }
  }`
}

const postInfo = (slug, posts) => ({
  slug,
  title: posts[slug].context.title
})

// Gets the page title for a given slug
const pageTitle = (slug, page) => {
  if (!page.frontmatter || !page.frontmatter.title || page.frontmatter.title === '') {
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
  if (
    typeof page.frontmatter !== 'undefined' &&
    typeof page.frontmatter.linktitle !== 'undefined' &&
    page.frontmatter.linktitle !== ''
  )
    return page.frontmatter.linktitle

  return page.frontmatter.title
}

const mdxList = (pages) =>
  Object.keys(pages).map((slug) => ({ slug, title: pages[slug].context.title }))

const createMdxPages = async function (pages, createPage, graphql, language) {
  let types = ['blog', 'showcase', 'docs']
  let promises = []
  let tree
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
              // Keep file here, it is used in the page query to filter
              file: page.node.fileAbsolutePath
            }
          }
          if (type !== 'docs')
            pages[type][slug].context.linktitle =
              page.node.frontmatter.linktitle || pages[type][slug].title
          // Handle duplicates in docs
          if (type === 'docs' && typeof routes.duplicates[slug] !== 'undefined') {
            for (let newSlug of routes.duplicates[slug]) {
              pages[type][newSlug] = {
                path: newSlug,
                component,
                context: {
                  slug: newSlug,
                  title: pages.docs[slug].context.title,
                  // Keep file here, it is used in the page query to filter
                  file: pages.docs[slug].context.file
                }
              }
            }
          }
        }
      }
      // Built initial page list, now add info
      if (type === 'docs') {
        // Documentation
        tree = buildTree(pages[type])
        for (const slug in pages.docs) {
          let up = getParentSlug(slug)
          pages.docs[slug].context.up = {
            slug: up,
            title: pages.docs[up] ? pages.docs[up].context.title : translate('app.docs')
          }
          // Children is a special prop in react, so we'll offspring
          pages.docs[slug].context.offspring = getOffspring(slug, pages.docs, tree)
        }
        // Only do this after all offspring has been discovered
        for (const slug in pages.docs)
          pages.docs[slug].context.siblings = getSiblings(slug, pages.docs, tree)
        // Only do this after all offspring and siblings have been discovered
        let prevs = {}
        let next
        for (const slug in pages.docs) {
          ;[next, pages.docs[slug].context.next] = getNextDoc(slug, pages.docs)
          prevs[next] = slug
        }
        for (const slug in pages.docs) {
          pages.docs[slug].context.previous = {
            slug: prevs[slug],
            title: pages.docs[prevs[slug]] ? pages.docs[prevs[slug]].context.title : prevs[slug]
          }
          pages.docs[slug].context.crumbs = getDocCrumbs(slug, pages.docs)
        }
      } else {
        // Blog & showcase posts
        let posts = Object.keys(pages[type])
        for (let i in posts) {
          let slug = posts[i]
          // Next
          let next
          if (parseInt(i) === posts.length - 1) next = 0
          else next = parseInt(i) + 1
          pages[type][slug].context.next = postInfo(posts[next], pages[type])
          // Previous
          let prev
          if (parseInt(i) === 0) prev = posts.length - 1
          else prev = parseInt(i) - 1
          pages[type][slug].context.previous = postInfo(posts[prev], pages[type])
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

  // This is a bit of a hack to create a sitemap page without the need for an
  // extra page query
  promises.push(
    new Promise((resolve, reject) => {
      createPage({
        path: '/sitemap/',
        component: path.resolve(`./src/pages/_sitemap.js`),
        context: {
          docs: mdxList(pages.docs),
          blog: mdxList(pages.blog),
          showcase: mdxList(pages.showcase),
          tree: tree
        }
      })
      resolve(true)
    })
  )

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
            context: { design }
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
              settingsMdxRegex: `//docs/draft/settings/${language}.md/`
            }
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
              measurementsMdxRegex: `//docs/measurements/${measurement.toLowerCase()}/${language}.md/`
            }
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
          component: path.resolve(`./src/pages/${routes.dynamic[match]}`)
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
          redirectInBrowser: true
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

  //await createMdxPages('blog', actions.createPage, graphql, language)
  //await createMdxPages('showcase', actions.createPage, graphql, language)
  //await createMdxPages('docs', actions.createPage, graphql, language)

  await createPerDesignPages(actions.createPage, language)
  await createPerMeasurementPages(actions.createPage, language)
  await createDynamicPages(actions.createPage)

  await createRedirects(actions.createRedirect)

  return
}

/* Source nodes from backend */
const axios = require(`axios`)
const crypto = require(`crypto`)
exports.sourceNodes = async ({ actions, getNode, createNodeId, hasNodeChanged }) => {
  const { createNode } = actions

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
          tier: tier
        },
        internal: {
          type: `FSPatron`
        },
        order: i
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

  return
}
