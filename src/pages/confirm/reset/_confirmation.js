import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'

const PasswordResetConfirmationPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.justAMoment'))
    app.confirmationLogin(props.confirmation)
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account"></Layout>
    </AppWrapper>
  )
}

export default withLanguage(PasswordResetConfirmationPage)
