import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import LoginRequired from '../../components/login-required'
import AccountMenu from '../../components/menus/account'
import AccountContext from '../../components/context/account'

const AccountPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.account'))
    app.refresh()
  }, [])

  return (
    <LoginRequired app={app}>
      <AppWrapper app={app} context={<AccountContext app={app} />}>
        <Layout app={app} active="account" context={<AccountContext app={app} />}>
          <AccountMenu app={app} className="transparent" />
        </Layout>
      </AppWrapper>
    </LoginRequired>
  )
}

export default withLanguage(AccountPage)
