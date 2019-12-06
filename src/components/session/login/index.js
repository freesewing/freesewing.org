import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import LoginForm from './login-form'
import ResetPasswordForm from './reset-password-form'
import Blockquote from '@freesewing/components/Blockquote'
import Oauth from '../oauth/'
import Button from '@material-ui/core/Button'

const Login = ({ app, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [trouble, setTrouble] = useState(false)
  const [inactive, setInactive] = useState(false)

  useEffect(() => {
    app.frontend.setTitle(app.frontend.intl.formatMessage({ id: 'app.logIn' }))
  }, [])

  const handleLogin = evt => {
    evt.preventDefault()
    app.backend.login(username, password, app.frontend.intl.locale, setInactive)
  }

  const handlePasswordReset = evt => {
    evt.preventDefault()
    app.backend.recoverAccount(evt.target[0].value)
  }

  if (inactive)
    return (
      <Blockquote type="note">
        <h5>
          <FormattedMessage id="account.accountIsInactive" />
        </h5>
        <p>
          <FormattedMessage id="account.accountNeedsActivation" />
        </p>
        <h6>
          <FormattedMessage id="app.askForHelp" />
        </h6>
        <p>
          <FormattedMessage id="app.joinTheChatMsg" />
        </p>
        <p style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" href="https://gitter.im/freesewing/help">
            <FormattedMessage id="app.askForHelp" />
          </Button>
        </p>
      </Blockquote>
    )

  const formProps = {
    intl: app.frontend.intl,
    username,
    password,
    setUsername,
    setPassword,
    trouble,
    setTrouble,
    handleLogin,
    handlePasswordReset
  }
  let main = <LoginForm {...formProps} />
  if (trouble) main = <ResetPasswordForm {...formProps} />
  return (
    <React.Fragment>
      {location && location.state && location.state.intent ? (
        <Blockquote type="note">
          <FormattedMessage
            id="app.loginRequiredRedirect"
            values={{ page: location.state.intent }}
          />
        </Blockquote>
      ) : null}
      <div>{main}</div>
      <a href="#trouble" onClick={() => setTrouble(!trouble)} data-test="trouble">
        <FormattedMessage id={'app.' + (trouble ? 'logIn' : 'troubleLoggingIn')} />
      </a>
      <span style={{ padding: '0 1rem' }}>|</span>
      <Link to="/signup" data-test="signup">
        <FormattedMessage id="app.signUpForAFreeAccount" />
      </Link>
      <div style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <Oauth app={app} login />
      </div>
    </React.Fragment>
  )
}

export default Login
