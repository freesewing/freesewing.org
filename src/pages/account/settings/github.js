import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const GithubSettingPage = props => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [github, setGithub] = useState(app.account.social ? app.account.social.github || '' : '')

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.github'))
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
  const updateGithub = evt => setGithub(evt.target.value)

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <Blockquote type="note">
          <FormattedMessage id={'account.githubInfo'} />
        </Blockquote>
        <TextField
          id="github"
          fullWidth={true}
          label={app.translate('account.github')}
          margin="normal"
          variant="outlined"
          value={github}
          type="text"
          onChange={updateGithub}
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
            onClick={() => app.updateAccount([github, 'social', 'github'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(GithubSettingPage)
