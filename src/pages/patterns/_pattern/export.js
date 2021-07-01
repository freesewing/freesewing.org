import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import AppWrapper from '../../../components/app/wrapper'

import LoadingLayout from '../../../components/layouts/loading'
import ExportPattern from '../../../components/pattern/export'

const Page = (props) => {
  const app = useApp()

  const [pattern, setPattern] = useState('pending')
  const [person, setPerson] = useState('pending')
  // Page title won't be available until async code runs
  const [title, setTitle] = useState(app.translate('app.pattern'))
  const [description, setDescription] = useState(false)

  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
        setPattern(p)
        setTitle(p.name)
        setDescription(p.notes || false)
      })
    } else {
      setPattern(patternOrPromise)
      setTitle(patternOrPromise.name)
      setDescription(patternOrPromise.notes || false)
    }
  }, [props.pattern])

  if (pattern === 'pending') return <LoadingLayout app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.exportPattern')}
      description={description}
      crumbs={[
        { title: app.translate('app.patterns'), slug: '/patterns/' },
        { title, slug: `/patterns/${props.params.pattern}/` },
      ]}
    >
      <ExportPattern app={app} data={pattern.data} handle={props.params.pattern} />
    </AppWrapper>
  )
}

export default Page
