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
    app.setContext(<AccountContext app={app} />)
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <AccountMenu app={app} className="transparent" settingsOnly />
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(SettingsPage)
