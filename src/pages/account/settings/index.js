import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'
import AccountMenu from '../../../components/menus/account'

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
    <AppWrapper app={app}>
      <CenteredLayout app={app} top wide left>
        <AccountMenu app={app} className="transparent" settingsOnly />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(SettingsPage)
