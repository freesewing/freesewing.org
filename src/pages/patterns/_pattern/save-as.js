import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import AppWrapper from '../../../components/app/wrapper'

import { Link } from 'gatsby'
import Loading from '../../../components/layouts/loading'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'

const Page = (props) => {
  const app = useApp()

  const [pattern, setPattern] = useState('pending')
  // Page title won't be available until async code runs
  const [title, setTitle] = useState(app.translate('app.pattern'))
  const [description, setDescription] = useState(false)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
        setPattern(p)
        setTitle(p.name)
        setDescription(p.notes || false)
        setLoading(false)
      })
    } else {
      setPattern(patternOrPromise)
      setTitle(patternOrPromise.name)
      setDescription(patternOrPromise.notes || false)
      setLoading(false)
    }
  }, [props.pattern])

  if (pattern === 'pending') return <Loading app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }
  const updateName = (evt) => setName(evt.target.value)
  const updateNotes = (evt) => setNotes(evt.target.value)
  const handleSave = () => {
    setLoading(true)
    let nameVal = name
    if (name === '') {
      nameVal = `${pattern.data.design}`
      if (pattern.data.metadata) nameVal += ` / ${pattern.data.settings.metadata.for}`
    }
    let notesVal = notes
    if (notes === '') notesVal = 'Forked from pattern `' + props.params.pattern + '`'
    app
      .createPattern({
        name: nameVal,
        notes: notesVal,
        person: pattern.data.settings.metadata
          ? pattern.data.settings.metadata.forHandle
          : pattern.data.model,
        data: pattern.data
      })
      .then((data) => {
        setLoading(false)
        app.navigate(`/account/patterns/${data.handle}/`)
      })
  }

  // Pattern data
  const data = pattern.data
  delete data.settings.embed

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.saveAsNewPattern')}
      {...app.treeProps(props.location.pathname, false)}
    >
      {loading ? (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
          <Loading loading={true} embed size={250} />
        </div>
      ) : (
        <>
          <TextField
            id="name"
            fullWidth={true}
            label={app.translate('app.name')}
            margin="normal"
            variant="outlined"
            value={name}
            type="text"
            onChange={updateName}
          />
          <TextField
            multiline={true}
            rows="4"
            rowsMax="12"
            fullWidth={true}
            label={app.translate('app.notes')}
            margin="normal"
            variant="outlined"
            value={notes}
            onChange={updateNotes}
          />
        </>
      )}
      <p>
        <Button size="large" variant="contained" color="primary" onClick={handleSave}>
          <FormattedMessage id="app.saveAsNewPattern" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
