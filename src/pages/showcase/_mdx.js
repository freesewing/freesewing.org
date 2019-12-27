import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import PostLayout from '../../components/layouts/post'

import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Blockquote from '@freesewing/components/Blockquote'

const customComponents = {
  Note: ({ children }) => {
    return <Blockquote type="note">{children}</Blockquote>
  },
  Tip: ({ children }) => {
    return <Blockquote type="tip">{children}</Blockquote>
  },
  Warning: ({ children }) => {
    return <Blockquote type="warning">{children}</Blockquote>
  }
}

const ShowcasePostPage = props => {
  // State
  const app = useApp()

  // Data from page query
  const { body, frontmatter } = props.data.allMdx.edges[0].node

  // Effects
  useEffect(() => {
    app.setTitle(frontmatter.title)
    app.setCrumbs([
      {
        slug: '/showcase/',
        title: app.translate('app.showcase')
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <PostLayout app={app} frontmatter={frontmatter}>
        <MDXProvider components={customComponents}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </PostLayout>
    </AppWrapper>
  )
}

export default withLanguage(ShowcasePostPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxShowcasePost($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          frontmatter {
            title
            date
            caption
            author
            patterns
            img {
              childImageSharp {
                fluid(maxWidth: 1200) {
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
  }
`
