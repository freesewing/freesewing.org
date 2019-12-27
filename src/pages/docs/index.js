import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useNavigation from '../../hooks/useNavigation'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import WideLayout from '../../components/layouts/wide'

import { list as patterns } from '@freesewing/pattern-info'
import { measurements } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const DocumentationIndexPage = props => {
  // State
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.docs'))
  }, [])

  // Methods
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

  const renderDocs = branch => {
    let list = []
    let links = {}
    for (let slug of Object.keys(branch.children)) links[titles[slug]] = slug
    for (let title of Object.keys(links).sort()) {
      let slug = links[title]
      list.push(
        <li key={slug}>
          <Link to={slug}>{title}</Link>
        </li>
      )
    }
    return <ul className="links">{list}</ul>
  }

  // Data
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly'
    },
    column: {
      maxWidth: '350px',
      padding: '0 1rem'
    },
    subHeader: {
      margin: 0
    },
    blockquote: {
      maxWidth: '500px',
      margin: '2rem auto'
    }
  }

  return (
    <AppWrapper app={app}>
      <WideLayout app={app}>
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
              {measurements.womenswear.map(measurement => renderMeasurementDocs(measurement))}
            </ul>
          </div>
          <div style={styles.column}>
            <h2>
              <FormattedMessage id="app.various" />
            </h2>
            <h5 style={styles.subHeader}>
              <Link to="/docs/about/">
                <FormattedMessage id="app.aboutFreesewing" />
              </Link>
            </h5>
            {renderDocs(tree['/docs/about/'])}
            <h5 style={styles.subHeader}>
              <Link to="/docs/draft/">
                <FormattedMessage id="app.draft" />
              </Link>
            </h5>
            {renderDocs(tree['/docs/draft/'])}
          </div>
          <div style={styles.column}>
            <h2>
              <FormattedMessage id="app.sewing" />
            </h2>
            {renderDocs(tree['/docs/sewing/'])}
          </div>
        </div>
        <Blockquote style={styles.blockquote}>
          <h5>More on freesewing.dev</h5>
          <p>Freesewing.org only hosts documentation for makers.</p>
          <p>
            Our documentation for developers, editors, and translators is available on{' '}
            <a href="https://freesewing.dev/">freesewing.dev</a>
          </p>
        </Blockquote>
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(DocumentationIndexPage)
