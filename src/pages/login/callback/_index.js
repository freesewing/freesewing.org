import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'

import { navigate } from 'gatsby'
import Robot from '@freesewing/components/Robot'
import Error from '../../../components/error'

const Page = (props) => {
  // Only accept valid callbacks
  if (!props.confirmation || !props.validation) {
    if (typeof window !== 'undefined') navigate('/login/')
    else return null
  }

  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.justAMoment'))
    app.setLoading(true)
    app.providerLogin({ validation: props.validation, confirmation: props.confirmation })
  }, [])

  const [error, setError] = useState(false)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account">
        {error && (
          <div>
            <Robot pose="ohno" size={300} />
            <Error report={true} err={{ message: 'requestFailedWithStatusCode500' }} />
          </div>
        )}
      </Layout>
    </AppWrapper>
  )
}

export default Page
