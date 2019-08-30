const mdxQuery = require("./gatsby/mdx-query")
const buildNavigation = require("./gatsby/navigation")
const utils = require("./gatsby/utils")
const create = require("./gatsby/create")
const nonMdxPages = require("./gatsby/non-mdx-pages")


const slugFromFilePath = filePath => {
  return "/"+filePath.match(/[\/|\\]markdown[\/|\\]org[\/|\\](.*)/).pop().slice(0,-5)
}

const getMdxPages = function(graphql, language) {
  console.log('Getting MDX pages')
  const query = mdxQuery(language)
  return new Promise((resolve, reject) => {
    graphql(query).then(res => {
      console.log('Query complete')
    	if (typeof res.data === "undefined") {
    	  console.log("query failed", query, res);
    	  reject();
    	} else {
        let pages = {}
        for (let type of ['docs', 'blog', 'showcase']) {
          for (let page of res.data[type].edges) {
            pages[slugFromFilePath(page.node.fileAbsolutePath)] = page.node
          }
        }
    	  resolve(pages);
			}
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  // Without a language, this won't work
  const language = process.env.GATSBY_LANGUAGE;
  if (typeof language === "undefined")
    throw new Error("You MUST set the GATSBY_LANGUAGE environment variable (to 'en' for example)");

  console.log('getting mdx')
  const mdxPages = await getMdxPages(graphql, language)
  console.log('done, doing titles')
  const titles = utils.getTitles(mdxPages)
  console.log('done, building navigation')
  const navigation = buildNavigation(mdxPages, titles)
  console.log('done, creating pages')
  await create.mdxPages(mdxPages, navigation, titles, actions.createPage)
  await create.otherPages(nonMdxPages, navigation, titles, actions.createPage)

  console.log('return from createPages')
  return
};

/* Source nodes from backend */
const axios = require(`axios`)
const crypto = require(`crypto`)
exports.sourceNodes = async ({
  actions,
  getNode,
  createNodeId,
  hasNodeChanged,
}) => {
  const { createNode } = actions

  // Do the initial fetch
  const result = await axios.get(process.env.GATSBY_BACKEND + "patrons")
  // Create patron nodes.
  let i = 0;
  Object.keys(result.data).forEach( tier => {
    result.data[tier].map( patron => {
      const patronNode = {
        id: createNodeId(patron.handle),
        parent: null,
        patron: {
          ...patron,
          tier: tier
        },
        internal: {
          type: `FSPatron`,
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

