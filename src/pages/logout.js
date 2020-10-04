import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.logOut')} active="account">
      <p>
        <FormattedMessage id="app.clickBelowToLogOut" />
      </p>
      <Button variant="contained" color="primary" size="large" onClick={app.logout}>
        <FormattedMessage id="app.logOut" />
      </Button>
    </AppWrapper>
  )
}

export default Page
