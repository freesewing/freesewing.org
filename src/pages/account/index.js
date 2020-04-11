import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import LoginRequired from '../../components/login-required'
import AccountMenu from '../../components/menus/account'

const AccountPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.account'))
    app.refresh()
  }, [])

  return (
    <LoginRequired app={app}>
      <AppWrapper app={app}>
        <CenteredLayout app={app} top left wide>
          <AccountMenu app={app} className="transparent" />
        </CenteredLayout>
      </AppWrapper>
    </LoginRequired>
  )
}

export default withLanguage(AccountPage)
