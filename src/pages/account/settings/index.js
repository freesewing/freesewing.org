import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountMenu from '../../../components/menus/account'
import AccountContext from '../../../components/context/account'

const SettingsPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.settings'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      }
    ])
  }, [])

  return (
    <AppWrapper app={app} context={<AccountContext app={app} />}>
      <Layout app={app} active="account" context={<AccountContext app={app} />} text>
        <AccountMenu app={app} className="transparent" settingsOnly />
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(SettingsPage)
