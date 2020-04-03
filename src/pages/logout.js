import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import CenteredLayout from '../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Robot from '@freesewing/components/Robot'

const LogoutPage = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.logOut'))
  }, [])

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        <p>
          <FormattedMessage id="app.clickBelowToLogOut" />
        </p>
        <Button variant="contained" color="primary" size="large" fullWidth onClick={app.logout}>
          <FormattedMessage id="app.logOut" />
        </Button>
        <div style={{ margin: 'auto' }}>
          <Robot size={300} pose="shrug" />
        </div>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(LogoutPage)
