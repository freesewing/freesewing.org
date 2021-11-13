import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'

const Page = (props) => {
  const app = useApp(false)

  const post = props.data.authorsPost.post
  const img = post.picture?.formats?.medium?.url
    ? post.picture.formats.medium.url
    : post.picture?.formats?.small?.url
    ? post.picture.formats.small.url
    : post.picture?.formats?.xsmall?.url
    ? post.picture.formats.xsmall.url
    : post.picture.url
  const imgUrl = `https://posts.freesewing.org${img}`

  return (
    <AppWrapper
      app={app}
      title={post.displayname}
      img={`${imgUrl}`}
      {...app.treeProps(props.path)}
      crumbs={[{ title: 'Authors', slug: '/authors/' }]}
    >
      <img style={{ maxWidth: '100%', margin: 'auto' }} src={imgUrl} />
      <Markdown>{post.about}</Markdown>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query authorsPost($slugId: String) {
    authorsPost(post: { slug: { eq: $slugId } }) {
      post {
        displayname
        about
        picture {
          url
          formats {
            xsmall {
              width
              url
            }
            small {
              width
              url
            }
            medium {
              width
              url
            }
          }
        }
      }
    }
  }
`
