const buildQuery = function(language) {
  return `{
  docs: allMdx(
    filter: { fileAbsolutePath: { regex: "//docs/[^.]*/${language}.md/" } }
    sort: { fields: [frontmatter___title], order: DESC }
  ) {
      edges {
        node {
          body
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  blog: allMdx(
    filter: { fileAbsolutePath: { regex: "//blog/[^.]*/${language}.md/" } }
    sort: { fields: [frontmatter___title], order: DESC }
  ) {
      edges {
        node {
          body
          fileAbsolutePath
          frontmatter {
            title
            date
            year:date(formatString: "YYYY")
            linktitle
            caption
            author
            img {
              childImageSharp {
                fluid(maxWidth: 800) {
                  src
                  srcSet
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
  showcase: allMdx(
    filter: { fileAbsolutePath: { regex: "//showcase/[^.]*/${language}.md/" } }
    sort: { fields: [frontmatter___title], order: DESC }
  ) {
      edges {
        node {
          body
          fileAbsolutePath
          frontmatter {
            title
            date
            caption
            author
            patterns
            img {
              childImageSharp {
                fluid(maxWidth: 800) {
                  src
                  srcSet
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }`
}

module.exports = buildQuery

