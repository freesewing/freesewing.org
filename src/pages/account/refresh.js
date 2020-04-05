import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

const RefreshAccountPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.justAMoment'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      }
    ])
    app.refreshAccount()
  }, [])

  return     (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(RefreshAccountPage)
