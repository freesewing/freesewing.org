const getQuery = language => `{
  allMdx(filter: {fileAbsolutePath: {regex: "/${language}.md/"}}) {
  	edges {
  	  node {
        id
  	    fileAbsolutePath
  	    parent { ... on File { relativeDirectory } }
  	    frontmatter { title }
        internal { content }
  	  }
  	}
  }
}`

const flatten = arr => {
  return arr.map(node => {
    let it =
    {
      objectId: node.node.id,
      path: '/' + node.node.parent.relativeDirectory,
      title: node.node.frontmatter.title,
      content: node.node.internal.content
    }
    return it;
  })
}

const getSearchData = language => {
  const data = [
    {
      query: getQuery(language),
      transformer: ({ data }) => flatten(data.allMdx.edges),
      indexName: `${language}_freesewing_org`,
      settings: {}
    }
  ]

  return data;
}

module.exports = getSearchData
