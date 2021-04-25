import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const PostPreview = ({
  app,
  title,
  description,
  link,
  caption = '',
  width = 400,
  img = false,
  imgComponent = false,
  designs = false,
}) => {
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
      <Link data-test="post-link" to={link} style={style.link} title={title}>
        <figure style={style.figure}>
          <GatsbyImage image={img} alt={caption || title} className="shadow" />
        </figure>
        <h5 style={style.title}>{title}</h5>
        <p style={style.blurb}>{description}</p>
      </Link>
    </div>
  )
}

export default PostPreview
