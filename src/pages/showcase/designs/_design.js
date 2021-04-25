import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { graphql, Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    postWrapper: {
      maxHeight: '300px',
      maxWidth: '300px',
      margin: '10px',
    },
    img: {
      margin: '6px',
      padding: 0,
      borderRadius: '4px',
    },
    link: {
      margin: 0,
      padding: 0,
      height: '312px',
    },
  }
  if (app.mobile || app.tablet) {
    style.img.height = '150px'
    style.link.height = '162px'
  }

  const posts = []
  for (let node of props.data.allMdx.edges) {
    for (let p of node.node.frontmatter.patterns) {
      if (p === props.pageContext.design) posts.push(node.node)
    }
  }
  const renderPosts = () => {
    let showcases = []
    let i = 0
    for (let showcase of posts) {
      let img = getImage(showcase.frontmatter.img)
      showcases.push(
        <div style={style.postWrapper}>
          <Link
            to={`/${showcase.parent.relativeDirectory}/`}
            style={style.link}
            key={`fig-${i}`}
            title={showcase.frontmatter.title}
          >
            <GatsbyImage
              data-test="img"
              image={img}
              style={style.img}
              alt={showcase.frontmatter.title}
              className="shadow"
            />
          </Link>
        </div>
      )
      i++
    }
    if (i > 0) return <div style={style.wrapper}>{showcases}</div>
    else return <p>No showcase found</p>
  }

  // Data
  return (
    <AppWrapper
      app={app}
      title={app.translate(`patterns.${props.pageContext.design}.title`)}
      crumbs={[{ title: app.translate('app.showcase'), slug: '/showcase/' }]}
      wide
    >
      {renderPosts()}
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//showcase/[^/]*/[a-z]{2}.md/" } }
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
            patterns
            title
            img {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
