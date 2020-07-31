import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import DraftUi from '../../../components/draft/ui'

import usePattern from '../../../hooks/usePattern'
import usePerson from '../../../hooks/usePerson'
import LoadingLayout from '../../../components/layouts/loading'

import axios from 'axios'
import yaml from 'yaml'

const CreatePatternFromGist = (props) => {
  const app = useApp()

  // SSR
  if (typeof props.gist === 'undefined')
    return (
      <AppWrapper app={app}>
        <LoadingLayout app={app} />
      </AppWrapper>
    )

  // State
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
    breasts: gist?.settings?.metadata.breasts || false
  })

  // Effects
  useEffect(() => {
    axios
      .get(`https://api.github.com/gists/${props.gist}`)
      .then((res) => {
        if (res.data.files['pattern.yaml'].content) {
          let g = yaml.parse(res.data.files['pattern.yaml'].content)
          setGist(g)
          setDesign(g.design)
          setPerson(makePerson(g))
          app.setTitle(app.translate('app.recreateThing', { thing: `gist ${props.gist}` }))
          app.setCrumbs([
            {
              title: app.translate('app.recreateThing', { thing: 'gist' }),
              slug: '/recreate/gist/'
            }
          ])
        } else setError(true)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [props.gist])

  const fabs = ['zoom', 'compare', 'export', 'details']

  // Allow pattern to load
  if (!gist && !error)
    return (
      <AppWrapper app={app}>
        <LoadingLayout app={app} />
      </AppWrapper>
    )

  // Show this if things go wrong
  if (error)
    return (
      <AppWrapper app={app}>
        <p>oops</p>
      </AppWrapper>
    )

  return (
    <AppWrapper app={app}>
      <DraftUi
        mode="recreate"
        app={app}
        data={gist}
        person={person}
        design={design}
        recreate="gist"
        fabs={fabs}
      />
    </AppWrapper>
  )
}

export default withLanguage(CreatePatternFromGist)
