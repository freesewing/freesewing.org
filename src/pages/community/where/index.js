import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import useUiMdx from '../../../hooks/useUiMdx'
import Mdx from '../../../components/mdx'
import Offspring from '../../../components/offspring'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper
      app={app}
      title={app.translate('cty.whereToFindUs')}
      {...app.treeProps(props.path)}
      noTitle
    >
      <h1 className="scribble">
        <FormattedMessage id="cty.whereToFindUs" />
      </h1>
      <Mdx node={uiMdx[`community/where`]} />
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
