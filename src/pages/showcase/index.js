import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import PostPreview from '../../components/post-preview'
import { Link, graphql } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }

  const context = [
    <h5>Showcase posts</h5>,
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
    <AppWrapper
      app={app}
      title={app.translate('app.showcase')}
      description={app.translate('intro.txt-showcase')}
      context={context}
      active="showcase"
    >
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
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//showcase/[^/]*/[a-z]{2}.md/" } }
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
            author
            patterns
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
