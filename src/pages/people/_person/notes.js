import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import PeopleContext from '../../../components/context/people'

import TextField from '@material-ui/core/TextField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'

const PersonNotesPage = (props) => {
  // Hooks
  const app = useApp()

  if (typeof app.people[props.person] === 'undefined') return null // FIXME: Show something better than nothing in SSR

  // State
  const [notes, setNotes] = useState(app.people[props.person].notes || '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.notes'))
    app.setCrumbs([
      {
        slug: '/people/',
        title: app.translate('app.people')
      },
      {
        slug: '/people/' + props.person + '/',
        title: app.people[props.person].name || props.person
      }
    ])
    app.setContext(<PeopleContext app={app} />)
  }, [])

  // Methods
  const updateNotes = (evt) => setNotes(evt.target.value)

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
      <Layout app={app} active="account">
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
            href={'/people/' + props.person}
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
              app.updatePerson(props.person, [notes, 'notes'], `/people/${props.person}/`)
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(PersonNotesPage)
