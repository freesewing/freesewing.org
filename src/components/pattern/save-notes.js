import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Blockquote from '@freesewing/components/Blockquote'
import Loading from '../loading'

const SavePatternNotes = props => {

  // State
  const [name, setName] = useState(props.name)
  const [notes, setNotes] = useState(props.notes)

  // Methods
  const updateName = evt => setName(evt.target.value)
  const updateNotes = evt => setNotes(evt.target.value)
  const handleSave = () => {
    props.setDialog(false)
    let nameVal = name
    if (name === '') nameVal = props.pattern
    props.app
      .updatePattern(props.pattern, {
        name: nameVal,
        notes
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h3>
        <FormattedMessage id="app.saveThing" values={{ thing: props.app.translate('app.notes') }} />
      </h3>
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
        <Button size="large" fullWidth variant="contained" color="primary" onClick={handleSave}>
          <FormattedMessage
            id="app.saveThing"
            values={{ thing: props.app.translate('app.notes') }}
          />
        </Button>
      </p>
    </>
  )
}

export default SavePatternNotes
