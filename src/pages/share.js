import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import Layout from '../components/layouts/default'
import Mdx from '../components/mdx'

const SharePage = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  useEffect(() => {
    app.setTitle(uiMdx['share'].title)
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community">
        <Mdx node={uiMdx['share']} />
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(SharePage)
