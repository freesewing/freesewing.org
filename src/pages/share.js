import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import useUiMdx from '../hooks/useUiMdx'
import Mdx from '../components/mdx'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper
      app={app}
      title={uiMdx['share'].title}
      title={uiMdx['share'].excerpt}
      active="community"
      text
    >
      <Mdx node={uiMdx['share']} />
    </AppWrapper>
  )
}

export default Page
