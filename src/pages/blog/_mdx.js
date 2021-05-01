import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { Link, graphql } from 'gatsby'
import Mdx from '../../components/mdx'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Page = (props) => {
  const app = useApp(false)

  const frontmatter = props.data.allMdx.edges[0].node.frontmatter
  const img = getImage(frontmatter.img)
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
  const tags = frontmatter.patterns
    ? frontmatter.patterns.map((pattern) => {
        return (
          <Link to={'/showcase/designs/' + pattern} style={{ marginRight: '8px' }} key={pattern}>
            #{pattern}
          </Link>
        )
      })
    : null

  return (
    <AppWrapper
      app={app}
      title={props.data.allMdx.edges[0].node.frontmatter.title}
      description={props.data.allMdx.edges[0].node.excerpt}
      image={img.images.fallback.src}
      {...app.treeProps(props.path)}
      edit={props.data.allMdx.edges[0].node.parent.relativeDirectory}
    >
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
          <GatsbyImage
            image={getImage(frontmatter.img)}
            alt={frontmatter.caption}
            className="shadow"
            data-test="img"
          />
        </a>
        <figcaption data-test="caption" dangerouslySetInnerHTML={{ __html: frontmatter.caption }} />
      </figure>
      <div style={style.body}>
        <Mdx node={props.data.allMdx.edges[0].node} />
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxBlogPost($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          excerpt
          body
          tableOfContents(maxDepth: 3)
          frontmatter {
            date
            year: date
            linktitle
            title
            caption
            author
            img {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
