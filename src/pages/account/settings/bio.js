import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Markdown from 'react-markdown'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [bio, setBio] = useState(app.account.bio || '')

  const styles = {
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem',
    },
  }

  return (
    <AppWrapper app={app} title={app.translate('account.bio')} {...app.treeProps(props.path)}>
      <TextField
        id="bio"
        multiline={true}
        rows="4"
        rowsMax="12"
        fullWidth={true}
        label={app.translate('account.bio')}
        margin="normal"
        variant="outlined"
        value={bio}
        onChange={(evt) => setBio(evt.target.value)}
      />
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
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
          onClick={() => app.updateAccount([bio, 'bio'], '/account/settings/')}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h6>
        <FormattedMessage id="app.preview" />
      </h6>
      <div style={styles.preview} className="shadow" data-test="preview">
        <Markdown>{bio}</Markdown>
      </div>
      <Blockquote type="note">
        <FormattedMessage id="account.bioInfo" />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
