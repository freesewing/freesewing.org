import { useStaticQuery, graphql } from 'gatsby'

function useUiMdx() {
  // Static query
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { glob: "**/markdown/org/ui/**/*.md" } }) {
        edges {
          node {
            frontmatter {
              title
            }
            fileAbsolutePath
            body
          }
        }
      }
    }
  `)
  let uiMdx = {}
  for (let node of data.allMdx.edges) {
    let id = node.node.fileAbsolutePath.split('markdown/org/ui/').pop().slice(0, -6)
    uiMdx[id] = {
      title: node.node.frontmatter.title,
      body: node.node.body
    }
  }

  return uiMdx
}

export default useUiMdx
