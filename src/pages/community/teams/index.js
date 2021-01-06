import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import useUiMdx from '../../../hooks/useUiMdx'
import Mdx from '../../../components/mdx'
import Offspring from '../../../components/offspring'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title={app.translate('cty.teams')} {...app.treeProps(props.path)}>
      <Mdx node={uiMdx[`community/teams`]} />
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
