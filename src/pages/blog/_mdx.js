import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import PostLayout from '../../components/layouts/post'

import { graphql } from 'gatsby'
import Mdx from '../../components/mdx'

const BlogPostPage = (props) => {
  // State
  const app = useApp()

  // Data from page query
  const frontmatter = props.data.allMdx.edges[0].node.frontmatter

  // Effects
  useEffect(() => {
    app.setTitle(frontmatter.title)
    app.setCrumbs([
      {
        slug: '/blog/',
        title: app.translate('app.blog')
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <PostLayout app={app} frontmatter={frontmatter}>
        <Mdx node={props.data.allMdx.edges[0].node} />
      </PostLayout>
    </AppWrapper>
  )
}

export default withLanguage(BlogPostPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxBlogPost($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          frontmatter {
            title
            date
            year: date
            linktitle
            caption
            author
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
