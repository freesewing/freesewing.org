const useDraftDocs = function (data) {
  if (!data) return null
  let docs = {
    options: {},
    settings: {},
  }
  for (let node of data.options.edges) {
    docs.options[node.node.parent.relativeDirectory.split('/').pop()] = {
      title: node.node.frontmatter.title,
      body: node.node.body,
    }
  }
  for (let node of data.settings.edges) {
    docs.settings[node.node.parent.relativeDirectory.split('/').pop()] = {
      title: node.node.frontmatter.title,
      body: node.node.body,
    }
  }

  return docs
}

export default useDraftDocs
