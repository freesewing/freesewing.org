import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import TextField from '@material-ui/core/TextField'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Markdown from 'react-markdown'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (typeof app.people[props.person] === 'undefined') return null

  const [notes, setNotes] = useState(app.people[props.person].notes || '')

  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem'
    }
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.notes')}
      {...app.treeProps(`/account/people/${props.params.person}/notes/`)}
    >
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
        onChange={(evt) => setNotes(evt.target.value)}
      />
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href={'/account/people/' + props.person}
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
            app.updatePerson(props.person, [notes, 'notes'], `/account/people/${props.person}/`)
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
    </AppWrapper>
  )
}

export default Page
