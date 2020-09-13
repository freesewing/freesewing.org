import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import Layout from '../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Robot from '@freesewing/components/Robot'

const LogoutPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.logOut'))
    app.setDescription(app.translate('app.clickBelowToLogOut'))
  }, [])

  const context = [
    <h5>
      <a href="#" onClick={app.logout}>
        <FormattedMessage id="app.logOut" />
      </a>
    </h5>
  ]

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" context={context}>
        <p>
          <FormattedMessage id="app.clickBelowToLogOut" />
        </p>
        <Button variant="contained" color="primary" size="large" onClick={app.logout}>
          <FormattedMessage id="app.logOut" />
        </Button>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(LogoutPage)
