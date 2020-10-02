import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  // Load minimal app hook for static content
  const app = useApp(false)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.docs'))
    app.setContext(context)
  }, [])

  const docs = [
    <li>
      <Link to="/docs/about/">
        <FormattedMessage id="app.aboutFreesewing" />
      </Link>
    </li>,
    <li>
      <Link to="/docs/measurements/">
        <FormattedMessage id="app.measurements" />
      </Link>
    </li>,
    <li>
      <Link to="/docs/patterns/">
        <FormattedMessage id="app.patterns" />
      </Link>
    </li>,
    <li>
      <Link to="/docs/sewing/">
        <FormattedMessage id="app.sewing" />
      </Link>
    </li>
  ]

  const context = [
    <h5>
      <FormattedMessage id="app.docs" />
    </h5>,
    <ul>{docs}</ul>
  ]

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="docs" text>
        <ul className="links">{docs}</ul>
        <p>
          Click through to drill down, or refer to <Link to="/sitemap/#docs">the sitemap</Link> for
          a full list of all documentation.
        </p>
        <Blockquote type="note">
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

export default Page
