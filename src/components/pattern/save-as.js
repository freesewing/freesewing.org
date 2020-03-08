import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Blockquote from '@freesewing/components/Blockquote'
import Loading from '../loading'
import { navigate } from 'gatsby'

const SavePatternAs = props => {
  console.log('save as', props)
  // State
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  // Pattern data
  const data = { ...props.data }
  delete data.settings.embed

  // Methods
  const updateName = evt => setName(evt.target.value)
  const updateNotes = evt => setNotes(evt.target.value)
  const handleSave = () => {
    setLoading(true)
    let nameVal = name
    if (name === '') nameVal = `${data.design} / ${data.settings.metadata.for}`
    let notesVal = notes
    if (notes === '') notesVal = `
- 👕 : [${data.design}](/designs/${data.design}/)
- 🧑 : [${data.settings.metadata.for}](/people/${props.person.handle}/)
- 📅 : ${new Date().toISOString()}`
    props.app
      .createPattern({
        name: nameVal,
        notes: notesVal,
        person: props.person.handle,
        data: props.data
      })
      .then(data => {
        setLoading(false)
        navigate(`/patterns/${data.handle}/`)
        //props.app.setTitle(nameVal)
        //props.setPattern(data)
        props.setDialog(false)
        props.setAction('pick')
      })
  }

  return (
    <>
      <h3><FormattedMessage id='app.saveAsNewPattern' /></h3>
      { loading
        ? <div style={{textAlign: 'center', margin: 'auto'}}><Loading loading={true} embed size={250}/></div>
        : (
          <>
            <TextField
              id="name"
              fullWidth={true}
              label={props.app.translate('app.name')}
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
              label={props.app.translate('app.notes')}
              margin="normal"
              variant="outlined"
              value={notes}
              onChange={updateNotes}
            />
          </>
        )}
      <p>
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <FormattedMessage id="app.saveAsNewPattern" />
        </Button>
      </p>
    </>
  )
}

export default SavePatternAs
