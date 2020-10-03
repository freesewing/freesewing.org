import React, { useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

const Page = props => {

  const app = useApp()

  useEffect(() => {
    app.confirmationLogin(props.confirmation)
  }, [])

  return <AppWrapper
    app={app}
    title={app.translate('app.justAMoment')}
    active='designs'
  />
}

export default Page
