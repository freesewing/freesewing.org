import React, { useState, useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import { FormattedMessage } from 'react-intl'
import successGif from '../../components/session/signup/success.gif'

const SignupCallbackPage = props => {
  // State
  const app = useApp()

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top noTitle>
        <h1>
          <FormattedMessage id="app.yay" />
          &nbsp;
          <FormattedMessage id="app.goodJob" />
        </h1>
        <p>
          <FormattedMessage id="app.checkInboxClickLinkInConfirmationEmail" />
        </p>
        <img src={successGif} alt="Yay!" />
        <p>
          <FormattedMessage id="app.goAheadWeWillWait" />
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(SignupCallbackPage)
