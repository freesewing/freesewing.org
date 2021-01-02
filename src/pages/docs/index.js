import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp(false)

  const docs = [
    <li key="about">
      <Link to="/docs/about/">
        <FormattedMessage id="app.aboutFreesewing" />
      </Link>
    </li>,
    <li key="measurements">
      <Link to="/docs/measurements/">
        <FormattedMessage id="app.measurements" />
      </Link>
    </li>,
    <li key="patterns">
      <Link to="/docs/patterns/">
        <FormattedMessage id="app.patterns" />
      </Link>
    </li>,
    <li key="sewing">
      <Link to="/docs/sewing/">
        <FormattedMessage id="app.sewing" />
      </Link>
    </li>
  ]

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.docs')}
      slug={props.path}
      next={app.getNext(props.path)}
      prev={app.getPrev(props.path)}
    >
      <ul className="links">{docs}</ul>
      <p>
        Click through to drill down, or refer to <Link to="/sitemap/#docs">the sitemap</Link> for a
        full list of all documentation.
      </p>
      <Blockquote type="note">
        <h5>More on freesewing.dev</h5>
        <p>Freesewing.org only hosts documentation for makers.</p>
        <p>
          Our documentation for developers, editors, and translators is available on{' '}
          <a href="https://freesewing.dev/">freesewing.dev</a>
        </p>
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
