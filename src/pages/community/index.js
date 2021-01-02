import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import useUiMdx from '../../hooks/useUiMdx'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.community')}
      noTitle
      {...app.treeProps(props.path)}
    >
      <h1 className="scribble">#WeAre&shy;FreeSewing</h1>
      <h4
        className="scribble"
        dangerouslySetInnerHTML={{ __html: app.translate('app.txt-footer') }}
      />
      <ul className="links">
        <li>
          <Link to="/community/who/">
            <FormattedMessage id="cty.whoWeAre" />
          </Link>
        </li>
        <li>
          <Link to="/community/where/">
            <FormattedMessage id="cty.whereToFindUs" />
          </Link>
        </li>
        <li>
          <Link to="/community/teams/">{uiMdx['community/teams'].title}</Link>
        </li>
      </ul>
      <Blockquote type="tip">
        <Mdx node={uiMdx[`community/hashtag`]} />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
