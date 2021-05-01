import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import DraftUi from '../../../components/draft/ui'
import LoadingLayout from '../../../components/layouts/loading'
import axios from 'axios'
import yaml from 'yaml'

const Page = (props) => {
  const app = useApp()

  // SSR
  if (typeof props.gist === 'undefined') return <LoadingLayout app={app} />

  const [gist, setGist] = useState(null)
  const [pattern, setPattern] = useState(null)
  const [design, setDesign] = useState(null)
  const [person, setPerson] = useState(null)
  const [error, setError] = useState(false)

  // Helper method for person object
  const makePerson = (gist) => ({
    handle: gist?.settings?.metadata?.forHandle || 'gist',
    name: gist?.settings?.metadata?.for || 'J. Doe',
    label: gist?.settings?.metadata?.for || 'J. Doe',
    measurements: gist?.settings?.measurements,
    breasts: gist?.settings?.metadata.breasts || false,
  })

  const title = app.translate('app.recreateThing', { thing: 'gist' })
  const crumbs = [
    {
      title: app.translate('app.recreateThing', { thing: 'gist' }),
      slug: '/recreate/gist/',
    },
  ]

  useEffect(() => {
    axios
      .get(`https://api.github.com/gists/${props.gist}`)
      .then((res) => {
        if (res.data.files['pattern.yaml'].content) {
          let g = yaml.parse(res.data.files['pattern.yaml'].content)
          setGist(g)
          setDesign(g.design)
          setPerson(makePerson(g))
        } else setError(true)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [props.gist])

  // Allow pattern to load
  if (!gist && !error)
    return (
      <AppWrapper app={app} title={title} crumbs={crumbs} active="designs" text>
        <LoadingLayout app={app} />
      </AppWrapper>
    )

  // Show this if things go wrong
  if (error)
    return (
      <AppWrapper app={app} title={title} crumbs={crumbs} active="designs" text>
        <p>oops</p>
      </AppWrapper>
    )

  const actions = ['zoom', 'compare', 'export']
  if (app.account.username) actions.push('saveAs')
  else actions.push('units')

  return (
    <AppWrapper app={app} title={title} crumbs={crumbs} noLayout>
      <DraftUi
        mode="recreate"
        app={app}
        data={gist}
        person={person}
        design={design}
        recreate="gist"
        title={title}
        crumbs={crumbs}
        actions={actions}
      />
    </AppWrapper>
  )
}

export default Page
