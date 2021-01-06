import React from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'

import PatternData from '../../../../components/pattern/data'

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.params.pattern)

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  return (
    <AppWrapper app={app} title="YAML" {...app.treeProps(props.location.pathname, false)}>
      <PatternData data={pattern} />
    </AppWrapper>
  )
}

export default Page
