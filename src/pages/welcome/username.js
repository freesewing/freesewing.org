import React, { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const WelcomeUsernamePage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [username, setUsername] = useState(app.account.username)
  const [usernameValid, setUsernameValid] = useState(true)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.usernameTitle'))
    app.setCrumbs([
      {
        slug: '/welcome/',
        title: <FormattedMessage id="app.welcome" />
      }
    ])
  }, [])

  // Methods
  const updateUsername = (evt) => {
    let value = evt.target.value
    setUsername(value)
    app.isUsernameAvailable(value).then((result) => setUsernameValid(result))
  }

  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top>
        <div style={{ textAlign: 'left' }}>
          <Blockquote type="note">
            <p>
              <FormattedMessage
                id="account.usernameInfo"
                values={{ em: (...chunks) => <em>{chunks}</em> }}
              />
            </p>
          </Blockquote>
          <TextField
            id="username"
            fullWidth={true}
            label={app.translate('account.username')}
            margin="normal"
            variant="outlined"
            value={username}
            type="text"
            onChange={updateUsername}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {usernameValid ? (
                    <ValidIcon style={{ color: '#40c057' }} />
                  ) : (
                    <InvalidIcon color="error" />
                  )}
                </InputAdornment>
              )
            }}
          />
        </div>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([username, 'username'], '/welcome/avatar/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={43} variant="determinate" />
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomeUsernamePage)
