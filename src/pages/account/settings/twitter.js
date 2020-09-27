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
import InputAdornment from '@material-ui/core/InputAdornment'

const TwitterSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [twitter, setTwitter] = useState(app.account.social ? app.account.social.twitter || '' : '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.twitter'))
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
    app.setContext(<AccountContext app={app} />)
  }, [])

  // Methods
  const updateTwitter = (evt) => setTwitter(evt.target.value)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <TextField
          id="twitter"
          fullWidth={true}
          label={app.translate('account.twitter')}
          margin="normal"
          variant="outlined"
          value={twitter}
          type="text"
          onChange={updateTwitter}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>
          }}
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
            onClick={() => app.updateAccount([twitter, 'social', 'twitter'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage id={'account.twitterInfo'} />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(TwitterSettingPage)
