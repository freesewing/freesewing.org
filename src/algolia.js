const getQuery = language => `{
  allMdx(filter: {fileAbsolutePath: {regex: "/${language}.md/"}}) {
  	edges {
  	  node {
  	    fileAbsolutePath
        html
  	    parent { ... on File { relativePath } }
  	    frontmatter { title }
  	  }
  	}
  }
}`

const flatten = arr => {
  return arr.map(node => {
    let it =
    {
      path: '/' + node.node.parent.relativePath.slice(0, -5),
      title: node.node.frontmatter.title,
      html: node.node.html
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
