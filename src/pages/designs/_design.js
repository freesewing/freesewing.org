import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import PostPreview from '../../components/post-preview'
import { FormattedMessage } from 'react-intl'
import PlayIcon from '@material-ui/icons/PlayArrow'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import Button from '@material-ui/core/Button'
import { info as patternInfo, measurements, options } from '@freesewing/pattern-info'
import PatternMeasurements from '../../components/docs/pattern-measurements'
import PatternOptions from '../../components/docs/pattern-options'
import { Link, graphql } from 'gatsby'
import LineDrawing from '@freesewing/components/LineDrawing'
import Blockquote from '@freesewing/components/Blockquote'
import capitalize from '@freesewing/utils/capitalize'
import Hashtag from '../../components/hashtag'
import { getImage } from 'gatsby-plugin-image'
import Logo from '@freesewing/components/Logo'

const Page = (props) => {
  const app = useApp(false)

  const design = props.pageContext.design

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'left',
    },
    col: {
      maxWidth: '290px',
      margin: '1rem',
    },
    img: {
      marginTop: '1rem',
      borderRadius: '4px',
    },
    star: {
      margin: '4px 2px 0',
      display: 'inline-block',
    },
    table: {},
    keyTd: {
      textAlign: 'right',
      padding: '0.25rem 1rem 0.25rem 0',
      lineHeight: 1.15,
      fontWeight: 300,
    },
    valTd: {
      lineHeight: 1.15,
      padding: '0.25rem 0',
      fontWeight: 500,
    },
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
        <Logo size={16} />
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

  // Skip the size-select step if the pattern does not require measurments
  let createLink
  if (info.measurements.length === 0) createLink = `/create/${design}/for/any/`
  else createLink = `/create/${design}/`

  return (
    <AppWrapper
      app={app}
      title={app.translate(`patterns.${design}.title`)}
      description={app.translate(`patterns.${design}.description`)}
      image={`https://freesewing.org/designs/${design}.jpg`}
      slug={props.path}
      wide
      prev={app.getPrev(props.path)}
      next={app.getNext(props.path)}
    >
      {info.deprecated && (
        <Blockquote type="note">
          <h5>{capitalize(design)} is deprecated</h5>
          <p>
            We recommend{' '}
            <Link to={`/designs/${info.deprecated}/`}>{capitalize(info.deprecated)}</Link> instead.
          </p>
        </Blockquote>
      )}
      <div className="spaced">
        <Button
          data-test="create"
          color="primary"
          variant="contained"
          size="large"
          href={createLink}
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
        <Hashtag tag={`FreeSewing${capitalize(design)}`} title={capitalize(design) + ' Hashtag'} />
      </div>
      <p id="description">
        <FormattedMessage id={'patterns.' + design + '.description'} />
      </p>
      <div style={styles.wrapper}>
        <div style={styles.col}>
          <LineDrawing pattern={design} />
          <table>
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
      </div>
      <h5>
        <FormattedMessage id="app.requiredMeasurements" />
      </h5>
      <PatternMeasurements pattern={design} app={app} />
      <h5>
        <FormattedMessage id="app.patternOptions" />
      </h5>
      <PatternOptions pattern={design} app={app} />
      <div style={styles.wrapper}>
        {props.data.allShowcasePost.nodes.map((node) => {
          if ([node.post.design1, node.post.design2, node.post.design3].indexOf(design) === -1)
            return null
          return (
            <PostPreview
              key={node.post.slug}
              app={app}
              post={node.post}
              type="showcase"
              width={300}
            />
          )
        })}
      </div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allShowcasePost(sort: { order: DESC, fields: order }) {
      nodes {
        post {
          title
          design1
          design2
          design3
          image {
            formats {
              large {
                width
                url
              }
              medium {
                width
                url
              }
              small {
                width
                url
              }
              thumbnail {
                width
                url
              }
            }
          }
          slug
        }
      }
    }
  }
`
