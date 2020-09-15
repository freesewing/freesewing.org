import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import ReadMore from '../../components/read-more'

const DocumentationIndexPage = (props) => {
  // State
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.docs'))
  }, [])

  // Data
  const styles = {
    wrapper: {
      display: app.mobile ? 'block' : 'flex',
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
      maxWidth: '500px'
    }
  }

  const context = [
    <h5>
      <FormattedMessage id="app.docs" />
    </h5>,
    <ul>
      <li>
        <Link to="/docs/about/">
          <FormattedMessage id="app.aboutFreesewing" />
        </Link>
      </li>
      <li>
        <Link to="/docs/measurements/">
          <FormattedMessage id="app.measurements" />
        </Link>
      </li>
      <li>
        <Link to="/docs/patterns/">
          <FormattedMessage id="app.patterns" />
        </Link>
      </li>
      <li>
        <Link to="/docs/sewing/">
          <FormattedMessage id="app.sewing" />
        </Link>
      </li>
    </ul>
  ]

  return (
    <AppWrapper app={app} context={context}>
      <Layout app={app} active="docs" context={context}>
        <div style={styles.wrapper}>
          <div style={styles.column}>
            <h5>
              <Link to="/docs/about/">
                <FormattedMessage id="app.aboutFreesewing" />
              </Link>
            </h5>
            <ReadMore root="docs/about" recurse={true} />
          </div>
          <div style={styles.column}>
            <h5>
              <Link to="/docs/measurements/">
                <FormattedMessage id="app.measurements" />
              </Link>
            </h5>
            <ReadMore root="docs/measurements" />
          </div>
          <div style={styles.column}>
            <h5>
              <Link to="/docs/patterns/">
                <FormattedMessage id="app.patterns" />
              </Link>
            </h5>
            <ReadMore root="docs/patterns" />
          </div>
          <div style={styles.column}>
            <h5>
              <Link to="/docs/sewing/">
                <FormattedMessage id="app.sewing" />
              </Link>
            </h5>
            <ReadMore root="docs/sewing" />
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(DocumentationIndexPage)
