const query = `{
  docs: allMdx(filter: {fileAbsolutePath: {regex: "/en.md/"}}) {
  	edges {
  	  node {
  	    fileAbsolutePath
  	    html
  	    parent { ... on File { relativePath, name } }
  	    rawBody
  	    frontmatter { title }
  	  }
  	}
  }
}`

const flatten = arr =>
  arr.map(node => {
    return {
      path: '/' + node.node.parent.relativePath.slice(0, -5),
      body: node.node.rawBody,
      html: node.node.html,
      title: node.node.frontmatter.title
    }
  })

const queries = [
  {
    query,
    transformer: ({ data }) => flatten(data.allMdx.edges),
    indexName: 'en_freesewing_dev',
    settings: {}
  }
]

module.exports = queries
