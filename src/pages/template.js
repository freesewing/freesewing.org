import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'

const Template = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.template'))
  }, [])

  return <AppWrapper app={app}>page content goes here</AppWrapper>
}

export default withLanguage(Template)
