import React from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import AppWrapper from '../../components/app/wrapper'

import Newsletter from '../../components/homepage/newsletter'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title="Newsletter" {...app.treeProps(props.path)}>
      <Newsletter app={app} uiMdx={uiMdx} contentOnly />
    </AppWrapper>
  )
}

export default Page
