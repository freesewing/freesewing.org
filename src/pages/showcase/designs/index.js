import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { graphql, Link } from 'gatsby'
import { list as patternList } from '@freesewing/pattern-info'

const Page = (props) => {
  const app = useApp()

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    img: {
      height: '300px',
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

  const patterns = {}
  for (let p of patternList) patterns[p] = []
  for (let node of props.data.allMdx.edges) {
    for (let p of node.node.frontmatter.patterns) {
      patterns[p].push(node.node)
    }
  }

  const title = app.translate('app.showcase') + ': ' + app.translate('app.patterns')

  const renderPatterns = () => {
    let context = [<h5>{title}</h5>]
    let list = []
    let output = []
    for (let pattern in patterns) {
      let showcases = []
      let i = 0
      for (let showcase of patterns[pattern]) {
        let img = showcase?.frontmatter?.img?.childImageSharp?.fixed
        showcases.push(
          <Link
            to={`/${showcase.parent.relativeDirectory}/`}
            style={style.link}
            key={`fig-${pattern}-${i}`}
            title={showcase.frontmatter.title}
          >
            <img
              data-test="img"
              src={img?.src}
              style={style.img}
              srcSet={img?.srcSet}
              alt={pattern}
              className="shadow"
            />
          </Link>
        )
        i++
      }
      if (i > 0) {
        let link = (
          <Link to={`/showcase/designs/${pattern}/`}>
            {app.translate(`patterns.${pattern}.title`)}
          </Link>
        )
        output.push(<h2 key={`h2-${pattern}`}>{link}</h2>)
        output.push(
          <div key={`div-${pattern}`} style={style.wrapper}>
            {showcases}
          </div>
        )
        list.push(<li key={`li-${pattern}`}>{link}</li>)
      }
    }

    context.push(<ul>{list}</ul>)

    return [context, output]
  }

  const [context, output] = renderPatterns()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.showcase') + ': ' + app.translate('app.patterns')}
      crumbs={[{ title: app.translate('app.showcase'), slug: '/showcase/' }]}
      wide
    >
      {output}
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
                fixed(height: 300) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
