import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import CenteredLayout from '../components/layouts/centered'
import Mdx from '../components/mdx'

const SharePage = props => {
  const app = useApp()
  const uiMdx = useUiMdx()

  useEffect(() => {
    app.setTitle(uiMdx['share'].title)
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top left>
        <Mdx node={uiMdx['share']} />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(SharePage)
