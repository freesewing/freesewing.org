import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import LoginRequired from '../login-required'
import ModelList from './list'
import ModelPage from './show'
import EditNamePage from './edit-name'
import EditNotesPage from './edit-notes'
import EditMeasurementPage from './edit-measurement'

const ModelIndex = props => {
  useEffect(() => {
    if (props.slug === '/models') {
      props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({ id: 'app.models' }))
    } else {
      const chunks = props.slug.split('/')
      const model = chunks[2]
      let modelsCrumb = { slug: '/models', title: <FormattedMessage id="app.models" /> }
      if (chunks.length === 3) {
        props.app.frontend.setTitle(props.app.models[model].name)
        props.app.frontend.setCrumbs([modelsCrumb])
      } else if (chunks.length === 4) {
        props.app.frontend.setTitle(
          props.app.frontend.intl.formatMessage({ id: 'app.' + chunks[3] })
        )
        props.app.frontend.setCrumbs([
          modelsCrumb,
          { slug: '/models/' + model, title: props.app.models[model].name }
        ])
      } else if (chunks.length === 5) {
        props.app.frontend.setTitle(
          props.app.frontend.intl.formatMessage({ id: 'measurements.' + chunks[4] })
        )
        props.app.frontend.setCrumbs([
          modelsCrumb,
          { slug: '/models/' + model, title: props.app.models[model].name }
        ])
      }
    }
  }, [props.slug])

  let main
  if (props.slug === '/models') main = <ModelList app={props.app} />
  else {
    const chunks = props.slug.split('/')
    const model = chunks[2]
    if (props.app.models[model] === 'undefined')
      console.log('model was undefined', model, props.app.models)
    if (chunks.length === 3) main = <ModelPage model={model} app={props.app} />
    else if (chunks.length === 4) {
      if (chunks[3] === 'name') main = <EditNamePage model={model} app={props.app} />
      else main = <EditNotesPage model={model} app={props.app} />
    } else if (chunks.length === 5)
      main = <EditMeasurementPage model={model} measurement={chunks[4]} app={props.app} />
  }

  return <LoginRequired page={props.slug}>{main}</LoginRequired>
}

export default ModelIndex
