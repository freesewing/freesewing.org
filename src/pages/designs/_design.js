import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import PostPreview from '../../components/post-preview'

import { FormattedMessage } from 'react-intl'
import StarIcon from '@material-ui/icons/Star'
import PlayIcon from '@material-ui/icons/PlayArrow'
import DocsIcon from '@material-ui/icons/ImportContacts'
import Button from '@material-ui/core/Button'
import { info as patternInfo, measurements, options } from '@freesewing/pattern-info'
import PatternMeasurements from '../../components/docs/pattern-measurements'
import PatternOptions from '../../components/docs/pattern-options'
import { Link, graphql } from 'gatsby'
import LineDrawing from '@freesewing/components/LineDrawing'
import capitalize from '@freesewing/utils/capitalize'
import Hashtag from '../../components/hashtag'

const DesignPage = (props) => {
  // Design name is passed to page context in gatsby-node.js
  const design = props.pageContext.design

  // Hooks
  const app = useApp()

  // Effect
  useEffect(() => {
    app.setTitle(app.translate(`patterns.${design}.title`))
    app.setCrumbs([
      {
        slug: '/designs',
        title: <FormattedMessage id="app.designs" />
      }
    ])
  }, [])

  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    col: {
      maxWidth: '290px',
      margin: '1rem'
    },
    img: {
      marginTop: '1rem',
      borderRadius: '4px'
    },
    star: {
      color: 'orange'
    },
    table: {
      fontFamily: 'Roboto Condensed'
    },
    keyTd: {
      textAlign: 'right',
      padding: '0.25rem 1rem 0.25rem 0',
      lineHeight: 1.15
    },
    valTd: {
      lineHeight: 1.15,
      padding: '0.25rem 0',
      fontWeight: 'bold'
    }
  }
  if (app.mobile) styles.col.width = '100%'

  // Prepare content
  const info = patternInfo[design]
  info.measurements = measurements[design]
  info.options = options[design]

  const difficulty = []
  for (let i = 1; i <= info.difficulty; i++)
    difficulty.push(
      <span style={styles.star}>
        <StarIcon />
      </span>
    )

  const nameList = (list) => {
    let result = []
    if (typeof list !== 'string') {
      for (let name of list) {
        result.push(name)
        result.push(<span>, </span>)
      }
      result.pop()
    } else result.push(list)
    return result
  }

  const context = [
    <h5>
      <FormattedMessage id={`patterns.${design}.title`} />
    </h5>,
    <ul>
      <li>
        <Link to={`/create/${design}/`}>
          <FormattedMessage
            id="app.newThing"
            values={{ thing: capitalize(design) + ' ' + app.translate('app.pattern') }}
          />
        </Link>
        <Link to={`/docs/patterns/${design}/`}>
          <FormattedMessage id="app.docs" />
        </Link>
        <Link to={`/showcase/designs/${design}/`}>
          <FormattedMessage id="app.showcase" />
        </Link>
      </li>
    </ul>
  ]

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="designs" context={context}>
        <p>
          <Button
            data-test="create"
            style={{ marginRight: '1rem' }}
            color="primary"
            variant="contained"
            size="large"
            href={'/create/' + design + '/'}
          >
            <PlayIcon style={{ marginRight: '1rem' }} />
            <FormattedMessage
              id="app.newThing"
              values={{ thing: design + ' ' + app.translate('app.pattern') }}
            />
          </Button>
          <Button
            data-test="docs"
            color="primary"
            variant="outlined"
            size="large"
            href={'/docs/patterns/' + design + '/'}
          >
            <DocsIcon style={{ marginRight: '1rem' }} />
            <FormattedMessage id="app.docs" />
          </Button>
          <Hashtag
            tag={`FreeSewing${capitalize(design)}`}
            title={capitalize(design) + ' Hashtag'}
          />
        </p>
        <div style={styles.wrapper}>
          <div style={styles.col}>
            <p id="description">
              <FormattedMessage id={'patterns.' + design + '.description'} />
            </p>
            <LineDrawing pattern={design} />
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'filter.difficulty'} />
                  </td>
                  <td style={styles.valTd}>{difficulty}</td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'app.measurements'} />
                  </td>
                  <td style={styles.valTd}>{info.measurements.length}</td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'app.patternOptions'} />
                  </td>
                  <td style={styles.valTd}>{info.options.length}</td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'filter.department'} />
                  </td>
                  <td style={styles.valTd}>
                    <FormattedMessage id={'filter.' + info.department} />
                  </td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'filter.type'} />
                  </td>
                  <td style={styles.valTd}>
                    <FormattedMessage id={'filter.' + info.type} />
                  </td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'filter.design'} />
                  </td>
                  <td style={styles.valTd}>{nameList(info.design)}</td>
                </tr>
                <tr>
                  <td style={styles.keyTd}>
                    <FormattedMessage id={'filter.code'} />
                  </td>
                  <td style={styles.valTd}>{nameList(info.code)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={styles.col}>
            <img
              data-test="cover"
              src={'/designs/' + design + '.jpg'}
              alt={design}
              className="shadow"
              style={styles.img}
            />
          </div>
          <div style={styles.col} data-test="measurements">
            <h5>
              <FormattedMessage id="app.requiredMeasurements" />
            </h5>
            <PatternMeasurements pattern={design} app={app} />
          </div>
          <div style={styles.col} data-test="options">
            <h5>
              <FormattedMessage id="app.patternOptions" />
            </h5>
            <PatternOptions pattern={design} app={app} />
          </div>
        </div>
        <h2>
          <FormattedMessage id="app.showcase" />
        </h2>
        <div style={styles.wrapper}>
          {props.data.allMdx.edges.map((node) => {
            if (node.node.frontmatter.patterns.indexOf(design) === -1) return null
            return (
              <PostPreview
                key={node.node.parent.relativeDirectory}
                app={app}
                img={node.node.frontmatter.img.childImageSharp.fluid}
                title={node.node.frontmatter.title}
                description={node.node.excerpt}
                link={'/' + node.node.parent.relativeDirectory + '/'}
                caption={node.node.frontmatter.caption}
                width={300}
              />
            )
          })}
        </div>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(DesignPage)

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
          excerpt(pruneLength: 100)
          frontmatter {
            title
            patterns
            img {
              childImageSharp {
                fluid(maxWidth: 400) {
                  srcSet
                  src
                  sizes
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
  }
`
