import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import AccountContext from '../../../components/context/account'

import AccountMenu from '../../../components/menus/account'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.settings')}
      crumbs={[{ title: app.translate('app.account'), slug: '/account/' }]}
      context={<AccountContext app={app} />}
      active="account"
      text
    >
      <AccountMenu app={app} className="transparent" settingsOnly />
    </AppWrapper>
  )
}

export default Page
