import React, { useEffect } from 'react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from '@mdx-js/react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const BlogTemplate = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.pageContext.node.frontmatter.title)
  }, [])
  let frontmatter = props.pageContext.node.frontmatter
  let img = frontmatter.img.childImageSharp.fluid
  const style = {
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
    }
  }
  const components = {
    Note: ({ children }) => {
      return <Blockquote type="note">{children}</Blockquote>
    },
    Tip: ({ children }) => {
      return <Blockquote type="tip">{children}</Blockquote>
    },
    Warning: ({ children }) => {
      return <Blockquote type="warning">{children}</Blockquote>
    }
  }

  return (
    <React.Fragment>
      <div style={style.meta} data-test="meta">
        <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit" />
        <div>
          <FormattedMessage id="app.by" />
          &nbsp;
          <Link to={'/users/' + frontmatter.author} data-test="author">{frontmatter.author}</Link>
        </div>
      </div>
      <figure style={style.figure}>
        <a href={img.src}>
          <img
            data-test='img'
            src={img.src}
            style={{ width: '100%' }}
            srcSet={img.srcSet}
            alt={frontmatter.caption}
          />
        </a>
        <figcaption data-test="caption">{frontmatter.caption}</figcaption>
      </figure>
      <MDXProvider components={components}>
        <MDXRenderer>{props.pageContext.node.body}</MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  )
}

export default BlogTemplate
