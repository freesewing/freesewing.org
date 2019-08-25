import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useStaticQuery, graphql, Link } from 'gatsby'

const BlogYearTemplate = props => {
  useEffect(() => {
    if (props.year === 'years') {
      props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'app.years'}))
      props.app.frontend.setCrumbs([
        {
          slug: '/blog',
          title: <FormattedMessage id="app.blog" />
        }
      ])
    } else {
      props.app.frontend.setTitle(props.year)
      props.app.frontend.setCrumbs([
        {
          slug: '/blog',
          title: <FormattedMessage id="app.blog" />
        },
        {
          slug: '/blog/years',
          title: <FormattedMessage id="app.years" />
        }
      ])
    }
  }, [props.year])

  if (props.year === 'years') {
    return (
      <ul className="links">
        {[2019, 2018, 2017].map(year => (
          <li key={year}>
            <Link to={'/blog/years/' + year}>{year}</Link>
          </li>
        ))}
      </ul>
    )
  }

  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "//blog/[^/]*/en.md/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            parent {
              ... on File {
                relativeDirectory
              }
            }
            frontmatter {
              linktitle
              year: date(formatString: "YYYY")
            }
          }
        }
      }
    }
  `)

  return (
    <ul className="links">
      {data.allMdx.edges.map(node => {
        let frontmatter = node.node.frontmatter
        if (frontmatter.year !== props.year) return null
        return (
          <li key={node.node.parent.relativeDirectory}>
            <Link to={'/' + node.node.parent.relativeDirectory} title={frontmatter.linktitle}>
              {frontmatter.linktitle}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default BlogYearTemplate
