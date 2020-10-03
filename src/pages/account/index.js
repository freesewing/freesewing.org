import React from 'react'
import useApp from '../../hooks/useApp'
import LoginRequired from '../../components/login-required'
import AppWrapper from '../../components/app/wrapper'

import AccountMenu from '../../components/menus/account'
import AccountContext from '../../components/context/account'

const Page = (props) => {
  const app = useApp()

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('app.account')}
        context={<AccountContext app={app} />}
        active="account"
      >
        <AccountMenu app={app} className="transparent" />
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
