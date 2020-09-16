import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import Blockquote from '@freesewing/components/Blockquote'

const CommunityPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.community'))
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community">
        <Blockquote type="fixme">Add calls page here</Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(CommunityPage)
