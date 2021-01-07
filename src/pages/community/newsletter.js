import React from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import AppWrapper from '../../components/app/wrapper'

import Mdx from '../../components/mdx'
import Newsletter from '../../components/newsletter'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title="Newsletter" {...app.treeProps(props.path)}>
      {app.account && app.account.username && (
        <Blockquote type="tip">
          <h5>{uiMdx['newsletter/account'].title}</h5>
          <Mdx node={uiMdx['newsletter/account']} />
        </Blockquote>
      )}
      <Newsletter app={app} uiMdx={uiMdx} />
    </AppWrapper>
  )
}

export default Page
