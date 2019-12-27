import React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import ContentWrapper from '../wrappers/content'
import BreadCrumbs from '../breadcrumbs'

const PostLayout = ({ app, frontmatter, children }) => {
  const img = frontmatter.img.childImageSharp.fluid
  const style = {
    wrapper: {
      padding: '1rem',
      minHeight: 'calc(100vh - 6rem)',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 'auto'
    },
    meta: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      fontFamily: "'Roboto Condensed', sans-serif"
    },
    title: {
      marginBottom: 0
    },
    figure: {
      marginTop: 0
    },
    body: {
      maxWidth: '800px',
      fontSize: '125%',
      margin: 'auto'
    }
  }
  const tags = frontmatter.patterns
    ? frontmatter.patterns.map(pattern => {
        return (
          <Link to={'/showcase/designs/' + pattern} style={{ marginRight: '8px' }}>
            #{pattern}
          </Link>
        )
      })
    : null

  return (
    <ContentWrapper>
      <article style={style.wrapper}>
        <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
        <h1>{app.title}</h1>
        <div style={style.meta} data-test="meta">
          <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit" />
          <div>
            {tags}
            <FormattedMessage id="app.by" />
            &nbsp;
            <Link to={'/users/' + frontmatter.author} data-test="author">
              {frontmatter.author}
            </Link>
          </div>
        </div>
        <figure style={style.figure}>
          <a href={img.src}>
            <img
              data-test="img"
              src={img.src}
              style={{ width: '100%' }}
              srcSet={img.srcSet}
              alt={frontmatter.caption}
            />
          </a>
          <figcaption data-test="caption">{frontmatter.caption}</figcaption>
        </figure>
        <div style={style.body}>{children}</div>
      </article>
    </ContentWrapper>
  )
}

export default PostLayout
