import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { Link, graphql } from 'gatsby'
import PostPreview from '../../components/post-preview'

const BlogIndexPage = (props) => {
  // State
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.blog'))
    app.setDescription(app.translate('intro.txt-blog'))
  }, [])

  // Style
  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }
  const context = [
    <h5>Blog posts</h5>,
    <ul>
      {props.data.allMdx.edges.map((node) => (
        <li key={node.node.parent.relativeDirectory}>
          <Link to={`/${node.node.parent.relativeDirectory}/`} title={node.node.frontmatter.title}>
            {node.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  ]

  return (
    <AppWrapper app={app} context={context}>
      <Layout app={app} active="blog" context={context}>
        <div style={style.wrapper}>
          {props.data.allMdx.edges.map((node) => (
            <PostPreview
              key={node.node.parent.relativeDirectory}
              app={app}
              img={node.node.frontmatter.img.childImageSharp.fluid}
              title={node.node.frontmatter.title}
              description={node.node.excerpt}
              link={'/' + node.node.parent.relativeDirectory + '/'}
              caption={node.node.frontmatter.caption}
              width={400}
            />
          ))}
        </div>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(BlogIndexPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//blog/[^/]*/[a-z]{2}.md/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date
            linktitle
            author
            img {
              childImageSharp {
                fluid(maxWidth: 400) {
                  src
                  srcSet
                  sizes
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
  }
`
