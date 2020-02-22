import React from 'react'
import TextField from '@material-ui/core/TextField'
import LoginIcon from '@material-ui/icons/VpnKey'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import ButtonSpinner from '../../ButtonSpinner'

const LoginForm = props => {
  return (
    <React.Fragment>
      <p>Here?</p>
      <form onSubmit={props.handleLogin}>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label={props.intl.formatMessage({ id: 'account.username' })}
          margin="normal"
          variant="outlined"
          value={props.username}
          onChange={evt => props.setUsername(evt.target.value)}
        />
        <TextField
          id="password"
          fullWidth={true}
          type="password"
          autoComplete="password"
          label={props.intl.formatMessage({ id: 'account.password' })}
          margin="normal"
          variant="outlined"
          value={props.password}
          onChange={evt => props.setPassword(evt.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          disabled={props.loading}
          style={{ margin: '2rem' }}
        >
          <ButtonSpinner loading={props.loading} icon={<LoginIcon />} />
          <FormattedMessage id="app.logIn" />
        </Button>
      </form>
    </React.Fragment>
  )
}

export default LoginForm
