import React from 'react'
import useApp from '../../../hooks/useApp'
import LoginRequired from '../../../components/login-required'
import AppWrapper from '../../../components/app/wrapper'
import Offspring from '../../../components/offspring'

const Page = (props) => {
  const app = useApp()

  return (
    <LoginRequired app={app}>
      <AppWrapper app={app} title={app.translate('app.actions')} {...app.treeProps(props.path)}>
        <Offspring app={app} slug={props.path} />
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
