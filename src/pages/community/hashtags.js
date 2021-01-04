import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../../components/mdx'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title="Hashtags" noTitle {...app.treeProps(props.path)} wide>
      <h1 className="scribble">Hashtags</h1>
      <Mdx node={uiMdx[`community/hashtags`]} />
    </AppWrapper>
  )
}

export default Page
