import React, { useEffect, useState } from 'react'
import useApp from '../../../../../../hooks/useApp'
import AppWrapper from '../../../../../../components/app/wrapper'

import DraftUi from '../../../../../../components/draft/ui'
import usePattern from '../../../../../../hooks/usePattern'
import usePerson from '../../../../../../hooks/usePerson'
import LoadingLayout from '../../../../../../components/layouts/loading'

const Page = (props) => {
  const app = useApp()

  // SSR
  if (typeof props.person === 'undefined') return <LoadingLayout app={app} />

  // State
  const [pattern, setPattern] = useState(null)
  const [person, setPerson] = useState(
    props.person === 'original' ? null : usePerson(app, props.person)
  )
  const [design, setDesign] = useState(null)
  const [title, setTitle] = useState(
    app.translate('app.newThing', { thing: app.translate('app.pattern') })
  )
  const [crumbs, setCrumbs] = useState([])

  // Methods
  const getCrumbs = (design, name) => [
    {
      slug: `/create/`,
      title: app.translate('app.newThing', { thing: app.translate('app.pattern') })
    },
    {
      slug: `/create/${design}/`,
      title: app.translate('app.recreateThing', {
        thing: app.translate(`patterns.${design}.title`)
      })
    },
    {
      slug: `/recreate/${design}/from/${props.pattern}/`,
      title: app.translate('app.recreateThing', {
        thing: name + ' (' + app.translate(`patterns.${design}.title`) + ')'
      })
    }
  ]

  const extractPerson = (pattern) => {
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
      pop.then((p) => {
        setPattern(p)
        setDesign(p.data.design)
        setCrumbs(getCrumbs(p.data.design, p.name))
        // Do we need to pull the person info from the original pattern?
        if (props.person === 'original') extractPerson(p)
      })
    } else {
      setDesign(pop.data.design)
      setPattern(pop)
      setCrumbs(getCrumbs(pop.data.design, pop.name))
      // Do we need to pull the person info from the original pattern?
      let name = person ? person.name : 'original'
      if (!person && pop.data.settings.metadata) name = pop.data.settings.metadata.for
      if (!person) extractPerson(pop)
      setTitle(
        app.translate('app.recreateThingForPerson', {
          thing: pop.name + ' (' + app.translate(`patterns.${pop.data.design}.title`) + ')',
          person: name
        })
      )
    }
  }, [props.person, props.pattern])

  const fabs = ['zoom', 'compare', 'export', 'details']
  if (app.account.username) fabs.push('saveAs')

  // Allow pattern to load
  if (!pattern) return <LoadingLayout app={app} />

  const actions = ['zoom', 'compare', 'export']
  if (app.account.username) actions.push('saveAs')
  else actions.push('units')

  return (
    <AppWrapper app={app} title={title} crumbs={crumbs} noLayout>
      <DraftUi
        title={title}
        crumbs={crumbs}
        mode="recreate"
        app={app}
        data={{
          ...pattern.data,
          settings: {
            ...pattern.data.settings,
            measurements: person.measurements
          }
        }}
        person={person}
        design={pattern.data.design}
        recreate={props.pattern}
        title={title}
        crumbs={crumbs}
        actions={actions}
      />
    </AppWrapper>
  )
}

export default Page
