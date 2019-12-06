import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import StarIcon from '@material-ui/icons/Star'
import Button from '@material-ui/core/Button'
import { info as patternInfo, measurements, options } from '@freesewing/pattern-info'
import PatternMeasurements from '../docs/pattern-measurements'
import PatternOptions from '../docs/pattern-options'
import { useStaticQuery, graphql, Link } from 'gatsby'
import LineDrawing from '@freesewing/components/LineDrawing'

const PatternPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(
      props.app.frontend.intl.formatMessage({ id: 'patterns.' + props.pattern + '.title' })
    )
    props.app.frontend.setCrumbs([
      {
        slug: '/patterns',
        title: <FormattedMessage id="app.patterns" />
      }
    ])
  }, [props.pattern])
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
  `)

  const info = patternInfo[props.pattern]
  info.measurements = measurements[props.pattern]
  info.options = options[props.pattern]

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    col: {
      width: '48%'
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
    },
    button: {
      marginBottom: '1rem'
    },
    post: {
      width: props.mobile ? '100%' : '47.5%',
      marginBottom: '2rem'
    },
    figure: {
      margin: 0,
      padding: 0
    },
    title: {
      border: 0,
      fontSize: '1.5rem',
      margin: 0,
      padding: 0,
      lineHeight: 1.25
    },
    blurb: {
      fontSize: '1rem',
      margin: 0,
      padding: 0
    },
    link: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
  if (props.app.frontend.mobile) styles.col.width = '100%'

  const difficulty = []
  for (let i = 1; i <= info.difficulty; i++)
    difficulty.push(
      <span style={styles.star}>
        <StarIcon />
      </span>
    )

  const nameList = list => {
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

  return (
    <React.Fragment>
      <p data-test="description">
        <FormattedMessage id={'patterns.' + props.pattern + '.description'} />
      </p>
      <div style={styles.wrapper}>
        <div style={styles.col}>
          <Button
            data-test="create"
            style={styles.button}
            color="primary"
            variant="contained"
            size="large"
            fullWidth={true}
            href={'/create/' + props.pattern}
          >
            <FormattedMessage id="app.newPattern" values={{ pattern: props.pattern }} />
          </Button>
          <img
            data-test="cover"
            src={'/patterns/' + props.pattern + '.jpg'}
            alt={props.pattern}
            className="shadow"
            style={styles.img}
          />
        </div>
        <div style={styles.col}>
          <Button
            data-test="docs"
            style={styles.button}
            color="primary"
            variant="outlined"
            size="large"
            fullWidth={true}
            href={'/docs/patterns/' + props.pattern}
          >
            <FormattedMessage id="app.docs" />
          </Button>
          <LineDrawing pattern={props.pattern} />
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
        <div data-test="measurements">
          <h2>
            <FormattedMessage id="app.requiredMeasurements" />
          </h2>
          <PatternMeasurements pattern={props.pattern} app={props.app} />
        </div>
        <div data-test="options">
          <h2>
            <FormattedMessage id="app.patternOptions" />
          </h2>
          <PatternOptions pattern={props.pattern} app={props.app} />
        </div>
      </div>
      <h2>
        <FormattedMessage id="app.showcase" />
      </h2>
      <div style={styles.wrapper}>
        {data.allMdx.edges.map(node => {
          let frontmatter = node.node.frontmatter
          let img = frontmatter.img.childImageSharp.fluid
          if (frontmatter.patterns.indexOf(props.pattern) === -1) return null
          return (
            <div style={styles.post} key={node.node.parent.relativeDirectory}>
              <Link
                to={'/' + node.node.parent.relativeDirectory}
                style={styles.link}
                title={frontmatter.linktitle}
              >
                <figure style={styles.figure}>
                  <img
                    src={img.src}
                    style={{ width: '100%' }}
                    srcSet={img.srcSet}
                    alt={frontmatter.caption}
                  />
                </figure>
                <h2 style={styles.title}>{frontmatter.title}</h2>
                <p style={styles.blurb}>{node.node.excerpt}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default PatternPage
