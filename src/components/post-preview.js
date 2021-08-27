import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const PreviewImage = ({ formats }) => {
  const sources = []
  for (const size of ['large', 'medium', 'small', 'thumbnail']) {
    if (formats[size])
      sources.push(`https://posts.freesewing.org${formats[size].url} ${formats[size].width}w`)
  }

  return <img srcSet={sources.join(', ')} />
}

const PostPreview = ({ app, post, type, width = 400, designs = false }) => {
  const style = {
    post: {
      maxWidth: `${width}px`,
      margin: '0 6px 2rem',
    },
    figure: {
      margin: 0,
      padding: 0,
    },
    title: {
      margin: 0,
      padding: 0,
      lineHeight: 1.25,
    },
    blurb: {
      fontSize: '1.1rem',
      margin: 0,
      padding: 0,
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
    img: {
      borderRadius: '4px',
      width: '100%',
    },
  }
  if (app.mobile) {
    if (designs) {
      style.post.width = 'calc(50% - 12px)'
      style.post.maxWidth = 'calc(50% - 12px)'
    } else {
      style.post.width = '100%'
      style.post.maxWidth = '100%'
    }
  } else if (app.tablet) {
    style.post.width = 'calc(50% - 12px)'
    style.post.maxWidth = 'calc(50% - 12px)'
  }

  return (
    <div style={style.post}>
      <Link to={`/${type}/${post.slug}/`} style={style.link} title={post.title}>
        <PreviewImage formats={post.image.formats} />
        <h5 style={style.title}>{post.title}</h5>
      </Link>
    </div>
  )
}

export default PostPreview
