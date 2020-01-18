import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import TextField from '@material-ui/core/TextField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const EditPatternPage = props => {
  // Hooks
  const app = useApp()
  const pattern = usePattern(app, props.pattern)

  if (!pattern) return null // FIXME: Show something better than nothing in SSR

  // State
  const [name, setName] = useState(pattern.name)
  const [notes, setNotes] = useState(pattern.notes || '')

  // Effects
  useEffect(() => {
    app.setTitle(pattern.name)
    app.setCrumbs([
      {
        title: app.translate('app.patterns'),
        slug: '/patterns/'
      },
      {
        title: pattern.name,
        slug: `/patterns/${props.pattern}/`
      }
    ])
  }, [])

  // Methods
  const updateNotes = evt => setNotes(evt.target.value)
  const updateName = evt => setName(evt.target.value)

  // Style
  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <TextField
          fullWidth={true}
          label={app.translate('app.name')}
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
          label={app.translate('app.notes')}
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
            href={'/patterns/' + props.pattern}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => app.updatePattern(props.pattern, { notes, name })}
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
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(EditPatternPage)
