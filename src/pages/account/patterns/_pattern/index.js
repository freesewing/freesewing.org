import React from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'

import PatternNotes from '../../../../components/pattern/notes'
import PatternPreview from '../../../../components/pattern/preview'
import './index.css'

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.pattern)

  if (pattern === false) {
    if (app.account.username) app.navigate('/patterns/')
    else app.navigate('/')
    return null
  }

  return (
    <AppWrapper
      app={app}
      title={pattern.name}
      description={pattern.name}
      {...app.treeProps(props.location.pathname, false)}
    >
      {pattern.notes && <PatternNotes notes={pattern.notes} app={app} />}
      <div className="preview shadow">
        <PatternPreview data={pattern.data} app={app} pattern={props.pattern} />
      </div>
    </AppWrapper>
  )
}

export default Page
