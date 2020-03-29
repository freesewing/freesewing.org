const path = require('path')
const designs = require('@freesewing/pattern-info').list
const measurements = require('@freesewing/models').measurements.womenswear
const routes = require('./gatsby-routes')

// Expose some variables set by Netlify to send to Bugsnag
process.env.GATSBY_NETLIFY = process.env.NETLIFY
process.env.GATSBY_NETLIFY_BUILD_ID = process.env.BUILD_ID
process.env.GATSBY_NETLIFY_CONTEXT = process.env.CONTEXT
process.env.GATSBY_NETLIFY_REPOSITORY_URL = process.env.REPOSITORY_URL
process.env.GATSBY_NETLIFY_BRANCH = process.env.BRANCH
process.env.GATSBY_NETLIFY_COMMIT_REF = process.env.COMMIT_REF

const meta = {
  build: {
    netlify: process.env.NETLIFY,
    id: process.env.BUILD_ID,
    context: process.env.CONTEXT
  },
  git: {
    repo: process.env.REPOSITORY_URL,
    branch: process.env.BRANCH,
    commit: process.env.COMMIT_REF
  },
  language: process.env.GATSBY_LANGUAGE
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
  return `{
    allMdx(
      filter: { fileAbsolutePath: { regex: "//${type}/[^.]*/${language}.md/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) { edges { node { fileAbsolutePath } } }
  }`
}

const createMdxPages = async function (type, createPage, graphql, language) {
  let promises = []
  const query = mdxQuery(type, language)
  await graphql(query).then((res) => {
    if (typeof res.data === 'undefined') throw 'query failed ' + query
    else {
      for (let page of res.data.allMdx.edges) {
        let slug = slugFromFilePath(page.node.fileAbsolutePath)
        promises.push(
          new Promise((resolve, reject) => {
            createPage({
              path: slug,
              component: path.resolve(`./src/pages/${type}/_mdx.js`),
              context: {
                file: page.node.fileAbsolutePath
              }
            })
            resolve(true)
          })
        )
        // Handle duplicates in docs
        if (type === 'docs' && typeof routes.duplicates[slug] !== 'undefined') {
          for (let newSlug of routes.duplicates[slug]) {
            promises.push(
              new Promise((resolve, reject) => {
                createPage({
                  path: newSlug,
                  component: path.resolve('./src/pages/docs/_mdx.js'),
                  context: {
                    file: page.node.fileAbsolutePath
                  }
                })
                resolve(true)
              })
            )
          }
        }
      }
    }

    return Promise.all(promises)
  })
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

  await createMdxPages('blog', actions.createPage, graphql, language)
  await createMdxPages('showcase', actions.createPage, graphql, language)
  await createMdxPages('docs', actions.createPage, graphql, language)

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
