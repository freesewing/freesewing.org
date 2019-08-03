import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const EditRecipe = props => {
  const [name, setName] = useState(props.app.recipes[props.recipe].name)
  const [notes, setNotes] = useState(props.app.recipes[props.recipe].notes || '')

  const updateNotes = evt => setNotes(evt.target.value)
  const updateName = evt => setName(evt.target.value)

  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <React.Fragment>
      <TextField
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'app.name' })}
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
          )
        }}
      />
      <TextField
        multiline={true}
        rows="8"
        rowsMax="16"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'app.notes' })}
        margin="normal"
        variant="outlined"
        value={notes}
        onChange={updateNotes}
      />
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="outlined" color="primary" href={'/recipes/' + props.recipe}>
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() =>
            props.app.backend.saveRecipe(
              props.recipe,
              { notes, name },
              props.app.frontend.intl.formatMessage({ id: 'app.recipe' }),
              '/recipes/' + props.recipe
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h6>
        <FormattedMessage id="app.preview" />
      </h6>
      <div style={styles.preview} className="shadow">
        <h1>{name}</h1>
        <Markdown source={notes} />
      </div>
      <Blockquote type="note">
        <FormattedMessage id="app.thisFieldSupportsMarkdown" />
      </Blockquote>
    </React.Fragment>
  )
}

export default EditRecipe
