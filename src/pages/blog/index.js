import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { graphql } from 'gatsby'
import PostPreview from '../../components/post-preview'

const Page = (props) => {
  const app = useApp(false)

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }

  return (
    <AppWrapper app={app} title={app.translate('app.blog')} {...app.treeProps(props.path)} wide>
      <div style={style.wrapper}>
        {props.data.allBlogPost.nodes.map((node) => (
          <PostPreview key={node.post.slug} app={app} post={node.post} type="blog" width={368} />
        ))}
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allBlogPost(sort: { order: DESC, fields: order }) {
      nodes {
        post {
          title
          image {
            formats {
              large {
                width
                url
              }
              medium {
                width
                url
              }
              small {
                width
                url
              }
              thumbnail {
                width
                url
              }
            }
          }
          slug
        }
      }
    }
  }
`
