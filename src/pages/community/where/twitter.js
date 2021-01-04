import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import useUiMdx from '../../../hooks/useUiMdx'
import Mdx from '../../../components/mdx'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app} title="Twitter" {...app.treeProps(props.path)} noTitle>
      <h1 className="scribble">Twitter</h1>
      <Mdx node={uiMdx[`community/where/twitter`]} />
    </AppWrapper>
  )
}

export default Page
