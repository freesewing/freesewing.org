import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const Page = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.community'))
    app.setContext(context)
  }, [])

  const context = [
    <h5>
      <Link to="/community">
        <FormattedMessage id="app.community" />
      </Link>
    </h5>,
    <h6>
      <Link to="/community/who/">
        <FormattedMessage id="cty.whoWeAre" />
      </Link>
    </h6>,
    <h6>
      <Link to="/community/where/">
        <FormattedMessage id="cty.whereToFindUs" />
      </Link>
    </h6>,
    <h6>
      <Link to="/community/teams/">{uiMdx['community/teams'].title}</Link>
    </h6>
  ]

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community" text noTitle>
        <h1 className="scribble">#WeAre&shy;FreeSewing</h1>
        <h4
          className="scribble"
          dangerouslySetInnerHTML={{ __html: app.translate('app.txt-footer') }}
        />
        {context.slice(1)}
        <Blockquote type="tip">
          <Mdx node={uiMdx[`community/hashtag`]} />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default Page
