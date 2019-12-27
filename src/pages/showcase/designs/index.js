import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import WideLayout from '../../../components/layouts/wide'

import { useStaticQuery, graphql, Link } from 'gatsby'
import { list as patternList } from '@freesewing/pattern-info'

const ShowcaseIndexPage = props => {
  // State
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.showcase') + ': ' + app.translate('app.patterns'))
    app.setCrumbs([{ title: app.translate('app.showcase'), slug: '/showcase/' }])
  }, [])

  // Data
  const data = useStaticQuery(graphql`
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
  `)
  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    img: {
      height: '300px',
      margin: '6px',
      padding: 0,
      borderRadius: '4px'
    },
    link: {
      margin: 0,
      padding: 0,
      height: '312px'
    }
  }
  if (app.mobile || app.tablet) {
    style.img.height = '150px'
    style.link.height = '162px'
  }

  const patterns = {}
  for (let p of patternList) patterns[p] = []
  for (let node of data.allMdx.edges) {
    for (let p of node.node.frontmatter.patterns) {
      patterns[p].push(node.node)
    }
  }
  const renderPatterns = mdx => {
    let output = []
    for (let pattern in patterns) {
      let showcases = []
      let i = 0
      for (let showcase of patterns[pattern]) {
        let img = showcase.frontmatter.img.childImageSharp.fixed
        showcases.push(
          <Link
            to={`/${showcase.parent.relativeDirectory}/`}
            style={style.link}
            key={`fig-${pattern}-${i}`}
            title={showcase.frontmatter.title}
          >
            <img
              data-test="img"
              src={img.src}
              style={style.img}
              srcSet={img.srcSet}
              alt={pattern}
              className="shadow"
            />
          </Link>
        )
        i++
      }
      if (i > 0) {
        output.push(
          <h2 key={`h2-${pattern}`}>
            <Link to={`/showcase/patterns/${pattern}/`}>
              {app.translate(`patterns.${pattern}.title`)}
            </Link>
          </h2>
        )
        output.push(
          <div key={`div-${pattern}`} style={style.wrapper}>
            {showcases}
          </div>
        )
      }
    }

    return output
  }

  return (
    <AppWrapper app={app}>
      <WideLayout app={app}>
        {renderPatterns(patterns)}
        <div style={style.wrapper}></div>
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(ShowcaseIndexPage)
