import React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import BreadCrumbs from '../breadcrumbs'
import BaseLayout from './base'
import MainAside from '../menus/main-aside'
import MdxToc from '../mdx/toc'

const PostLayout = (props) => {
  const img = props.frontmatter.img.childImageSharp.fluid
  const style = {
    base: {
      maxWidth: '1200px'
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
      maxWidth: '60ch',
      fontSize: '115%',
      margin: 'auto'
    }
  }
  const tags = props.frontmatter.patterns
    ? props.frontmatter.patterns.map((pattern) => {
        return (
          <Link to={'/showcase/designs/' + pattern} style={{ marginRight: '8px' }} key={pattern}>
            #{pattern}
          </Link>
        )
      })
    : null

  return (
    <div className="fs-sa" dataLayout="docs">
      <aside>
        <div className="sticky">
          <MainAside app={props.app} active={props.active} />
          <div className="aside-context">
            <h6>
              <a href="#top">{props.frontmatter.title}</a>
            </h6>
            <MdxToc toc={props.toc} app={props.app} />
          </div>
        </div>
      </aside>
      <section>
        <article>
          <BreadCrumbs crumbs={props.app.crumbs} pageTitle={props.app.title} />
          <h1 id="top">{props.app.title}</h1>
          <div style={style.meta} data-test="meta">
            <FormattedDate
              value={props.frontmatter.date}
              year="numeric"
              month="long"
              day="2-digit"
            />
            <div>
              {tags}
              <FormattedMessage id="app.by" />
              &nbsp;
              <Link to={'/users/' + props.frontmatter.author} data-test="author">
                {props.frontmatter.author}
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
                alt={props.frontmatter.caption}
              />
            </a>
            <figcaption data-test="caption">{props.frontmatter.caption}</figcaption>
          </figure>
          <div style={style.body}>{props.children}</div>
        </article>
      </section>
    </div>
  )
}

export default PostLayout
