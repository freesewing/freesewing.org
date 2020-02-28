import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Blockquote from '@freesewing/components/Blockquote'

const SavePattern = props => {
  console.log(props)

  // State
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  // Pattern data
  const data = { ...props.data }
  delete data.settings.embed

  // Methods
  const updateName = evt => setName(evt.target.value)
  const updateNotes = evt => setNotes(evt.target.value)
  const handleSave = () => {
    let nameVal = name
    if (name === '') nameVal = 'This is an example'
    let notesVal = notes
    if (notes === '') notesVal = 'These are the notes'
    props.app
      .createPattern({
        name: nameVal,
        notes: notesVal,
        person: props.person,
        data: props.data
      })
      .then(res => {
        console.log(res)
      })
  }

  // Style
  const styles = {
    wrapper: {
      maxWidth: '42em',
      margin: 'auto'
    },
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <div style={styles.wrapper}>
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
      <p>
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <FormattedMessage id="app.saveThing" values={{thing: props.app.translate('app.pattern')}}/>
        </Button>
      </p>
      <Blockquote type="note">
        <h6>Name and Notes are optional</h6>
        <p>A name can help you tell your patterns apart. Notes can be handy too.</p>
      </Blockquote>
    </div>
  )
}

export default SavePattern
