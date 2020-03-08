import React, { useEffect, useState } from 'react'
import useApp from '../../../../../../hooks/useApp'
import withLanguage from '../../../../../../components/withLanguage'
import AppWrapper from '../../../../../../components/app/wrapper'
import DraftUi from '../../../../../../components/draft/ui'

import usePattern from '../../../../../../hooks/usePattern'
import usePerson from '../../../../../../hooks/usePerson'
import LoadingLayout from '../../../../../../components/layouts/loading'

const CreatePatternForPersonPage = props => {
  const app = useApp(props)

  // SSR
  if (typeof props.person === 'undefined')
    return (
      <AppWrapper app={app}>
        <LoadingLayout app={app} />
      </AppWrapper>
    )

  // State
  const [pattern, setPattern] = useState(null)
  const [person, setPerson] = useState(props.person === 'original' ? null : usePerson(app, props.person))
  const [design, setDesign] = useState(null)

  // Methods
  const applyCrumbs = (design, name) => {
   app.setCrumbs([
     {
       slug: `/create/`,
       title: app.translate('app.newThing', { thing: app.translate('app.pattern')})
     },
     {
       slug: `/create/${design}/`,
       title: app.translate('app.recreateThing', { thing: app.translate(`patterns.${design}.title`)})
     },
     {
       slug: `/recreate/${design}/from/${props.pattern}/`,
       title: app.translate('app.recreateThing', { thing: name + ' (' + app.translate(`patterns.${design}.title`) + ')' })
     },
   ])
  }
  const extractPerson = pattern => {
    setPerson({
      name: pattern.data.settings.metadata ? pattern.data.settings.metadata : pattern.person,
      measurements: { ...pattern.data.settings.measurements }
    })
  }

  // Effects
  useEffect(() => {
    /*
     * The usePattern hook is used to load the pattern
     *
     *   - Patterns that are in localStorage return instantly
     *   - Patterns loaded from the backend return a promise
     *
     *  pop = patternOrPromise
     */
    let pop = usePattern(app, props.pattern)
    if (pop.then instanceof Function) {
      // Pending promise
      pop.then(p => {
        setPattern(p)
        setDesign(p.data.design)
        applyCrumbs(p.data.design, p.name)
        // Do we need to pull the person info from the original pattern?
        if (props.person === 'original') extractPerson(p)
      })
    } else {
      setDesign(pop.data.design)
      setPattern(pop)
      applyCrumbs(pop.data.design, pop.name)
      // Do we need to pull the person info from the original pattern?
      let name = person ? person.name : 'original'
      if (pop.data.settings.metadata) name = pop.data.settings.metadata.for
      if (props.person === 'original') extractPerson(pop)
      app.setTitle(app.translate('app.recreateThingForPerson', {
        thing: pop.name + ' (' + app.translate(`patterns.${pop.data.design}.title`) + ')',
        person: name
      }))
    }
  }, [props.person, props.pattern]
  )

  const fabs = ['zoom', 'compare', 'export', 'details']
  if (app.account.username) fabs.push('saveAs')

  // Allow pattern to load
  if (!pattern)
    return (
      <AppWrapper app={app}>
        <LoadingLayout app={app} />
      </AppWrapper>
    )
  return (
    <AppWrapper app={app}>
      <DraftUi
        mode='recreate'
        app={app}
        data={pattern.data}
        person={person}
        design={pattern.data.design}
        recreate={props.pattern}
        fabs={fabs}
      />
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternForPersonPage)

