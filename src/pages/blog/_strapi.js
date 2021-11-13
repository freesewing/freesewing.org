import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Author from '../../components/author'
import { graphql } from 'gatsby'
import { FormattedDate, FormattedMessage } from 'react-intl'
import Markdown from 'react-markdown'

const PreviewImage = ({ formats }) => {
  const sources = []
  for (const size of ['large', 'medium', 'small', 'thumbnail']) {
    if (formats[size])
      sources.push(`https://posts.freesewing.org${formats[size].url} ${formats[size].width}w`)
  }

  return <img srcSet={sources.join(', ')} />
}

const Page = (props) => {
  const app = useApp(false)

  const style = {
    base: {
      maxWidth: '1200px',
    },
    meta: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    title: {
      marginBottom: 0,
    },
    figure: {
      marginTop: 0,
    },
    body: {
      maxWidth: '60ch',
      fontSize: '115%',
      margin: 'auto',
    },
  }

  //title={props.data.allMdx.edges[0].node.frontmatter.title}
  //description={props.data.allMdx.edges[0].node.excerpt}
  //image={img.images.fallback.src}
  const post = props.data.blogPost.post

  return (
    <AppWrapper
      app={app}
      title={post.title}
      img={`https://posts.freesewing.org${post.image.url}`}
      {...app.treeProps(props.path)}
    >
      <div style={style.meta} data-test="meta">
        <FormattedDate value={post.date} year="numeric" month="long" day="2-digit" />
        <div>
          <FormattedMessage id="app.by" />
          &nbsp;
          <a href="#author">{post.author.displayname}</a>
        </div>
      </div>
      <figure style={style.figure}>
        <PreviewImage formats={post.image.formats} />
        <figcaption data-test="caption" dangerouslySetInnerHTML={{ __html: post.caption }} />
      </figure>
      <div style={style.body}>
        <Markdown>{post.body}</Markdown>
      </div>
      <div>
        <Author author={post.author} type="blog" />
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query blogPost($slugId: String) {
    blogPost(post: { slug: { eq: $slugId } }) {
      post {
        title
        linktitle
        body
        date
        caption
        image {
          url
          formats {
            thumbnail {
              width
              url
            }
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
            large {
              width
              url
            }
          }
        }
        author {
          about
          displayname
          picture {
            formats {
              medium {
                url
              }
            }
          }
        }
      }
    }
  }
`
