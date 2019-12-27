import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import { navigate } from 'gatsby'
import Robot from '@freesewing/components/Robot'
import Error from '../../../components/error'

const LoginCallbackPage = props => {
  // Only accept valid callbacks
  if (!props.confirmation || !props.validation) navigate('/login/')

  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.justAMoment'))
    app.setLoading(true)
    app.loginOauth({ validation: props.validation, confirmation: props.confirmation }, handleResult)
  }, [])

  const [error, setError] = useState(false)

  const handleResult = (result, signup) => {
    if (result) {
      if (signup) navigate('/welcome')
      else navigate('/account')
    } else {
      setError(true)
      app.setTitle(app.translate('app.ohNo'))
      app.setLoading(false)
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        {error && (
          <div>
            <Robot pose="ohno" size={300} />
            <Error report={true} err={{ message: 'requestFailedWithStatusCode500' }} />
          </div>
        )}
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(LoginCallbackPage)
