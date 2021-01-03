import React from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'
import DraftUi from '../../../../components/draft/ui'

import usePattern from '../../../../hooks/usePattern'
import usePerson from '../../../../hooks/usePerson'
import LoadingLayout from '../../../../components/layouts/loading'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

/*
 * This page allows you to edit your own patterns
 */

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.params.pattern)

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  const saveMethod = (data) => {
    app
      .updatePattern(props.params.pattern, { data })
      .then((err) => {
        props.setDialog(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Handling both legacy and current ways of passing the person
  const person = pattern.data.settings.metadata
    ? usePerson(app, pattern.data.settings.metadata.forHandle)
    : usePerson(app, pattern.data.model)

  const shared = {
    app,
    title:
      app.translate('app.editThing', {
        thing: app.translate('app.pattern')
      }) +
      ' ' +
      pattern.handle,
    slug: props.location.pathname
  }
  shared.description = shared.title

  return (
    <AppWrapper {...shared} noLayout>
      <DraftUi
        {...shared}
        patternHandle={props.params.pattern}
        design={pattern.data.design}
        person={person}
        data={pattern.data}
        crumbs={app.getCrumbs(props.location.pathname)}
        saveMethod={saveMethod}
        actions={['zoom', 'compare', 'save', 'saveAsOwn', 'exportOwn']}
      />
    </AppWrapper>
  )
}

export default Page
