import React from 'react'
import useApp from '../../hooks/useApp'
import LoginRequired from '../../components/login-required'
import AppWrapper from '../../components/app/wrapper'

import AccountMenu from '../../components/menus/account'

const Page = (props) => {
  const app = useApp()

  return (
    <LoginRequired app={app}>
      <AppWrapper app={app} title={app.translate('app.account')} {...app.treeProps(props.path)}>
        <AccountMenu app={app} className="transparent" />
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
