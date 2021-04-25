import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { Link, graphql } from 'gatsby'
import Mdx from '../../components/mdx'
import { FormattedDate } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Page = (props) => {
  const app = useApp()

  // Data from page query
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
      title={props.pageContext.title}
      description={props.data.allMdx.edges[0].node.excerpt}
      image={img.images.fallback.src}
      {...app.treeProps(props.path)}
      edit={props.data.allMdx.edges[0].node.parent.relativeDirectory}
    >
      <div style={style.meta} data-test="meta">
        <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit" />
        <div>{tags}</div>
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
        <figcaption data-test="caption">{frontmatter.caption}</figcaption>
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
  query MdxShowcasePost($file: String) {
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
            caption
            patterns
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
