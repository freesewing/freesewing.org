import React from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'
import ExportPattern from '../../../../components/pattern/export'

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.params.pattern)

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.exportPattern')}
      {...app.treeProps(props.location.pathname, false)}
    >
      <ExportPattern app={app} data={pattern.data} handle={props.params.pattern} />
    </AppWrapper>
  )
}

export default Page
