import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import TextField from '@material-ui/core/TextField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'

const ModelNotesPage = props => {
  // Hooks
  const app = useApp()

  if (typeof app.models[props.model] === 'undefined') return null // FIXME: Show something better than nothing in SSR

  // State
  const [notes, setNotes] = useState(app.models[props.model].notes || '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.notes'))
    app.setCrumbs([
      {
        slug: '/models/',
        title: app.translate('app.models')
      },
      {
        slug: '/models/' + props.model + '/',
        title: app.models[props.model].name || props.model
      }
    ])
  }, [])

  // Methods
  const updateNotes = evt => setNotes(evt.target.value)

  // Styles
  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        <TextField
          data-test="notes"
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
            href={'/models/' + props.model}
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            data-test="save"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() =>
              app.saveModel(
                props.model,
                { notes },
                app.translate('app.notes'),
                '/models/' + props.model + '/'
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
          <Markdown source={notes} />
        </div>
        <Blockquote type="note">
          <FormattedMessage id="app.thisFieldSupportsMarkdown" />
        </Blockquote>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(ModelNotesPage)
