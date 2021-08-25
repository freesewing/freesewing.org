import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import PostPreview from '../../../components/post-preview'
import { graphql, Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    postWrapper: {
      maxHeight: '300px',
      maxWidth: '300px',
      margin: '10px',
    },
    img: {
      margin: '6px',
      padding: 0,
      borderRadius: '4px',
    },
    link: {
      margin: 0,
      padding: 0,
      height: '312px',
    },
  }
  if (app.mobile || app.tablet) {
    style.img.height = '150px'
    style.link.height = '162px'
  }

  const posts = []
  for (let node of props.data.allShowcasePost.nodes) {
    if (
      [node.post.design1, node.post.design2, node.post.design3].indexOf(
        props.pageContext.design
      ) !== -1
    )
      posts.push(node.post)
  }
  const renderPosts = () => {
    let showcases = []
    let i = 0
    for (let showcase of posts) {
      showcases.push(
        <>
          <Link
            to={`/showcase/${showcase.slug}/`}
            key={`fig-${props.pageContext.design}-${i}`}
            title={showcase.title}
          >
            <PostPreview
              key={showcase.slug}
              app={app}
              post={showcase}
              type="showcase"
              width={368}
            />
          </Link>
        </>
      )
      i++
    }
    if (i > 0) return <div style={style.wrapper}>{showcases}</div>
    else return <p>No showcase found</p>
  }

  // Data
  return (
    <AppWrapper
      app={app}
      title={app.translate(`patterns.${props.pageContext.design}.title`)}
      crumbs={[{ title: app.translate('app.showcase'), slug: '/showcase/' }]}
      wide
    >
      {renderPosts()}
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allShowcasePost(sort: { order: DESC, fields: order }) {
      nodes {
        post {
          title
          design1
          design2
          design3
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
