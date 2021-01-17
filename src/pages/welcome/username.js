import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import LoginRequired from '../../components/login-required'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [username, setUsername] = useState(app.account.username)
  const [usernameValid, setUsernameValid] = useState(true)

  const updateUsername = (evt) => {
    let value = evt.target.value
    setUsername(value)
    app.isUsernameAvailable(value).then((result) => setUsernameValid(result))
  }

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('account.usernameTitle')}
        crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      >
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
        <Blockquote type="note">
          <p>
            <FormattedMessage
              id="account.usernameInfo"
              values={{ em: (...chunks) => <em>{chunks}</em> }}
            />
          </p>
        </Blockquote>
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
