import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import Markdown from 'react-markdown'
import useUiMdx from '../../hooks/useUiMdx'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../mdx'

const SavePattern = (props) => {
  // Hooks
  const uiMdx = useUiMdx()

  if (!props.app.account.username) {
    let mdx = uiMdx['draft/sharing-patterns-requires-an-account']
    let btnProps = {
      style: {
        margin: '0.5rem',
      },
      color: 'primary',
      size: 'large',
    }
    return (
      <Blockquote type="note">
        <h4>{mdx.title}</h4>
        <Mdx node={mdx} />
        <p style={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={() => props.setDisplay('draft')} {...btnProps}>
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button variant="contained" href="/signup/" {...btnProps}>
            <FormattedMessage id="app.signUp" />
          </Button>
        </p>
      </Blockquote>
    )
  }

  // State
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  // Pattern data
  const data = { ...props.data }
  delete data.settings.embed

  // Methods
  const updateName = (evt) => {
    let value = evt.target.value
    setName(value)
  }
  const updateNotes = (evt) => setNotes(evt.target.value)
  const handleSave = () => {
    props.app
      .createPattern({
        name,
        person: props.person,
        notes,
        data,
      })
      .then((res) => {
        console.log(res)
      })
  }

  // Style
  const styles = {
    wrapper: {
      maxWidth: '42em',
      margin: 'auto',
    },
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem',
    },
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
          endAdornment: (
            <InputAdornment position="start">
              {name.length > 0 ? (
                <ValidIcon style={{ color: '#40c057' }} />
              ) : (
                <InvalidIcon color="error" />
              )}
            </InputAdornment>
          ),
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
        <h5>{name}</h5>
        <Markdown>{notes}</Markdown>
      </div>
    </div>
  )
}

export default SavePattern
