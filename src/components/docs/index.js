import React from 'react'
import { list as patterns } from '@freesewing/pattern-info'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const DocumentationIndexPage = props => {
  const renderPatternDocs = pattern => {
    return (
      <li key={pattern}>
        <Link to={'/docs/patterns/' + pattern}>{capitalize(pattern)}</Link>
      </li>
    )
  }

  const renderMeasurementDocs = m => {
    return (
      <li key={m}>
        <Link to={'/docs/measurements/' + m.toLowerCase()}>
          <FormattedMessage id={'measurements.' + m} />
        </Link>
      </li>
    )
  }

  const renderTopicDocs = topic => {
    let links = []
    let list = Object.keys(props.docs[topic])
    list.sort()
    for (let title of list)
      links.push(
        <li key={props.docs[topic][title]}>
          <Link to={props.docs[topic][title]}>{title}</Link>
        </li>
      )
    return <ul className="links">{links}</ul>
  }

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    column: {
      width: props.app.frontend.mobile ? '100%' : '48%'
    },
    subHeader: {
      margin: 0
    }
  }

  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        <div style={styles.column}>
          <h2>
            <FormattedMessage id="app.patterns" />
          </h2>
          <ul className="links">{patterns.map(pattern => renderPatternDocs(pattern))}</ul>
        </div>
        <div style={styles.column}>
          <h2>
            <FormattedMessage id="app.measurements" />
          </h2>
          <ul className="links">
            {props.measurements.map(measurement =>
              renderMeasurementDocs(measurement)
            )}
          </ul>
        </div>
        <div style={styles.column}>
          <h2>
            <FormattedMessage id="app.various" />
          </h2>
          <h5 style={styles.subHeader}>
            <FormattedMessage id="app.aboutFreesewing" />
          </h5>
          {renderTopicDocs('about')}
          <h5 style={styles.subHeader}>
            <FormattedMessage id="app.draft" />
          </h5>
          {renderTopicDocs('draft')}
        </div>
        <div style={styles.column}>
          <h2>
            <FormattedMessage id="app.sewing" />
          </h2>
          {renderTopicDocs('sewing')}
        </div>
      </div>
      <Blockquote>
        <h5>More on freesewing.dev</h5>
        <p>Freesewing.org only hosts documentation for makers.</p>
        <p>
          Our documentation for developers, editors, and translators is available on{' '}
          <a href="https://freesewing.dev/">freesewing.dev</a>
        </p>
      </Blockquote>
    </React.Fragment>
  )
}

export default DocumentationIndexPage
