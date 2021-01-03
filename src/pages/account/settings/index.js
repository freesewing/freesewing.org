import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import Offspring from '../../../components/offspring'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.settings')} {...app.treeProps(props.path)}>
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
