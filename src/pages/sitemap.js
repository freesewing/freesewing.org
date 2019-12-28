import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

const Sitemap = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.sitemap'))
  }, [])

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        page content goes here
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(Sitemap)
