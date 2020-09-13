import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Markdown from 'react-markdown'

const BioSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [bio, setBio] = useState(app.account.bio || '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.bio'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
  }, [])

  // Methods
  const updateBio = (evt) => setBio(evt.target.value)

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
      <Layout app={app} active="account" context={<AccountContext app={app} />} text>
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
          onChange={updateBio}
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
          <Markdown source={bio} />
        </div>
        <Blockquote type="note">
          <FormattedMessage id="account.bioInfo" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(BioSettingPage)
