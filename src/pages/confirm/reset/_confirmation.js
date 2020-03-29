import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

const PasswordResetConfirmationPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.justAMoment'))
    app.confirmationLogin(props.confirmation)
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}></CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(PasswordResetConfirmationPage)
