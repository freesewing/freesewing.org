import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { navigate } from 'gatsby'
import Robot from '@freesewing/components/Robot'
import Error from '../../../components/error'

const Page = (props) => {
  // Only accept valid callbacks
  if (!props.confirmation || !props.validation) {
    if (typeof window !== 'undefined') navigate('/login/')
    else return null
  }

  const app = useApp()

  // Effects
  useEffect(() => {
    app.setLoading(true)
    app.providerLogin({ validation: props.validation, confirmation: props.confirmation })
  }, [])

  const [error, setError] = useState(false)

  return (
    <AppWrapper app={app} title={app.translate('app.justAMoment')} active="account">
      {error && (
        <div>
          <Robot pose="ohno" size={300} />
          <Error report={true} err={{ message: 'requestFailedWithStatusCode500' }} />
        </div>
      )}
    </AppWrapper>
  )
}

export default Page
