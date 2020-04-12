import React, { useEffect } from 'react'
import useApp from '../../../../hooks/useApp'
import withLanguage from '../../../../components/withLanguage'
import AppWrapper from '../../../../components/app/wrapper'

import DraftLoadingLayout from '../../../../components/layouts/draft-loading'
import DraftUi from '../../../../components/draft/ui'
import usePerson from '../../../../hooks/usePerson'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'
import { version } from '../../../../../package.json'

const CreatePatternForPersonPage = (props) => {
  const app = useApp()
  const person = usePerson(app, props.person)

  // SSR
  if (typeof props.person === 'undefined')
    return (
      <AppWrapper app={app}>
        <DraftLoadingLayout app={app} />
      </AppWrapper>
    )

  // Effects
  useEffect(() => {
    app.setCrumbs([
      {
        slug: `/create/`,
        title: app.translate('app.newThing', { thing: app.translate('app.pattern') })
      },
      {
        slug: `/create/${props.pageContext.design}/`,
        title: app.translate('app.newThing', {
          thing: app.translate(`patterns.${props.pageContext.design}.title`)
        })
      }
    ])
    app.setTitle(
      app.translate('app.newPatternForModel', {
        pattern: app.translate(`patterns.${props.pageContext.design}.title`),
        model: person.name || props.person
      })
    )
  }, [props.person])

  // Initial pattern data
  const data = {
    design: props.pageContext.design,
    version,
    settings: {
      sa: 10,
      complete: true,
      paperless: false,
      locale: app.language,
      units: app.account.settings ? app.account.settings.units : 'metric',
      options: {},
      measurements: {},
      metadata: {
        for: person.name || props.person,
        forHandle: props.person
      }
    }
  }
  for (let m of requiredMeasurements[props.pageContext.design]) {
    data.settings.measurements[m] = person.measurements[m]
  }

  const fabs = ['zoom', 'compare', 'export', 'details']
  if (app.account.username) fabs.push('saveAs')
  else fabs.push('units')

  return (
    <AppWrapper app={app}>
      <DraftUi
        mode="create"
        app={app}
        person={person}
        design={props.pageContext.design}
        data={data}
        fabs={fabs}
      />
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternForPersonPage)
