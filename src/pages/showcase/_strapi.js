import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Author from '../../components/author'
import { Link, graphql } from 'gatsby'
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

  const post = props.data.showcasePost.post

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
          {post.design1 && (
            <span>
              <Link to={`/showcase/designs/${post.design1}/`}>{post.design1}</Link>
            </span>
          )}
          {post.design2 && (
            <span>
              {' '}
              & <Link to={`/showcase/designs/${post.design2}/`}>{post.design2}</Link>
            </span>
          )}
          {post.design3 && (
            <span>
              {' '}
              & <Link to={`/showcase/designs/${post.design3}/`}>{post.design3}</Link>
            </span>
          )}
          {post.maker && (
            <>
              &nbsp;
              <FormattedMessage id="app.by" />
              &nbsp;
              <a href="#author">{post.maker.displayname}</a>
            </>
          )}
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
        <Author author={post.maker} type="showcase" />
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query showcasePost($slugId: String) {
    showcasePost(post: { slug: { eq: $slugId } }) {
      post {
        title
        body
        date
        design1
        design2
        design3
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
        maker {
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
