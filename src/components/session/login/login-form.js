import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import InputAdornment from '@material-ui/core/InputAdornment'

const LoginForm = props => {
  const [reveal, setReveal] = useState(false)

  return (
    <React.Fragment>
      <form onSubmit={props.handleLogin}>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label={props.translate('account.username')}
          margin="normal"
          variant="outlined"
          value={props.username}
          onChange={evt => props.setUsername(evt.target.value)}
        />
        <TextField
          id="password"
          fullWidth={true}
          type={reveal ? 'text' : 'password'}
          autoComplete="password"
          label={props.translate('account.password')}
          margin="normal"
          variant="outlined"
          value={props.password}
          onChange={evt => props.setPassword(evt.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span
                  role="img"
                  aria-label="reveal"
                  onClick={() => setReveal(!reveal)}
                  className="poh"
                >
                  {reveal ? (
                    <span role="img" aria-label="show" data-test="show-password">
                      👀{' '}
                    </span>
                  ) : (
                    <span role="img" aria-label="show" data-test="hide-password">
                      🙈{' '}
                    </span>
                  )}
                </span>
              </InputAdornment>
            )
          }}
        />
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          disabled={props.loading || props.username.length < 1 || props.password.length < 1}
          style={{ margin: '2rem 0' }}
        >
          <FormattedMessage id="app.logIn" />
        </Button>
      </form>
    </React.Fragment>
  )
}

export default LoginForm
