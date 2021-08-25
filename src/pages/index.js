import React from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import AppWrapper from '../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { graphql, Link } from 'gatsby'
import LatestNews from '../components/LatestNews'
import Splash from '../components/homepage/splash'
import IconBar from '../components/homepage/iconbar'
import SupportBanner from '../components/homepage/support-banner'
import Newsletter from '../components/newsletter'
import Markdown from 'react-markdown'

// Style
import './homepage.scss'

const PreviewImage = ({ formats }) => {
  const sources = []
  for (const size of ['large', 'medium', 'small', 'thumbnail']) {
    if (formats[size])
      sources.push(`https://posts.freesewing.org${formats[size].url} ${formats[size].width}w`)
  }

  return <img srcSet={sources.join(', ')} />
}

const renderBlogPost = (post) => (
  <div className="post">
    <Link to={`/blog/${post.slug}/`} title={post.title} className="image">
      <PreviewImage formats={post.image.formats} />
    </Link>
    <div>
      <Link to={`/blog/${post.slug}/`} title={post.title}>
        <h3>{post.title}</h3>
      </Link>
      <Markdown>{post.body.split('\n\n').shift()}</Markdown>
    </div>
  </div>
)

const HomePage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} noLayout noNavbar>
      <div id="homepage">
        <IconBar app={app} />
        <Splash app={app} uiMdx={uiMdx} />
        <SupportBanner />
        <div className="news">
          <LatestNews />
        </div>
        <Newsletter app={app} uiMdx={uiMdx} homepage />

        {/* Latest blog posts */}
        <div id="blog">
          <div className="single">{renderBlogPost(props.data.blog.nodes[0].post)}</div>
          <div className="many">
            {renderBlogPost(props.data.blog.nodes[1].post)}
            {renderBlogPost(props.data.blog.nodes[2].post)}
            {renderBlogPost(props.data.blog.nodes[3].post)}
            <p style={{ textAlign: 'right', padding: '0 1rem' }}>
              <Link to="/blog/" className="more">
                <FormattedMessage id="app.browseBlogposts" /> &raquo;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppWrapper>
  )
}

export default HomePage

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    blog: allBlogPost(limit: 4, sort: { fields: [post___date], order: DESC }) {
      nodes {
        post {
          body
          title
          date
          linktitle
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
