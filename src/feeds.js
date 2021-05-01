// See gatsby-config.js
const language = process.env.GATSBY_LANGUAGE
const domain = language === 'en' ? 'freesewing.org' : language + '.freesewing.org'

// This runs out of heap memory. Seems showcases are not going down so well
//module.exports = ['Showcase', 'Blog'].map(feed => ({
module.exports = ['Blog'].map((feed) => ({
  serialize: ({ query: { site, allMdx } }) => {
    return allMdx.edges.map((edge) => {
      let slug = `https://${domain}/${edge.node.parent.relativeDirectory}/`
      return Object.assign({}, edge.node.frontmatter, {
        description: edge.node.excerpt,
        date: edge.node.frontmatter.date,
        title: edge.node.frontmatter.title,
        url: slug,
        guid: slug,
        custom_elements: [{ 'content:encoded': edge.node.html }],
      })
    })
  },
  query: `
    {
      allMdx(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "//${feed.toLowerCase()}/[^/]*/[a-z]{2}.md/"}, body: {}}) {
        edges {
          node {
            parent {
              ... on File {
                relativeDirectory
              }
            }
            excerpt
            html
            frontmatter {
              title
              date
              author
            }
          }
        }
      }
    }`,
  output: `/${feed.toLowerCase()}.xml`,
  title: `freesewing.org ${feed} feed`,
}))
