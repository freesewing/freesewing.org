import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import Markdown from 'react-markdown'

const SavePattern = props => {
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  const data = { ...props.data }
  delete data.settings.embed

  const updateName = evt => {
    let value = evt.target.value
    setName(value)
  }
  const updateNotes = evt => setNotes(evt.target.value)

  const handleSave = () => {
    props.app
      .createPattern({
        name,
        model: props.model,
        notes,
        data
      })
      .then(res => {
        console.log(res)
      })
  }

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
        InputProps={{
          startAdornment: <InputAdornment position="start">{data.design + '/'}</InputAdornment>,
          endAdornment: (
            <InputAdornment position="start">
              {name.length > 0 ? (
                <ValidIcon style={{ color: '#40c057' }} />
              ) : (
                <InvalidIcon color="error" />
              )}
            </InputAdornment>
          )
        }}
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
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => props.setDisplay('draft')}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          disabled={name.length > 0 ? false : true}
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h6>
        <FormattedMessage id="app.preview" />
      </h6>
      <div style={styles.preview} className="shadow">
        <h5>
          <small>{props.data.design} /</small> {name}
        </h5>
        <Markdown source={notes} />
      </div>
    </div>
  )
}

export default SavePattern
