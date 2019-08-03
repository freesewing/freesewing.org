import React, { useState } from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import LoginForm from './login-form'
import ResetPasswordForm from './reset-password-form'
import Blockquote from '@freesewing/components/Blockquote'
import Oauth from '../oauth/'

const Login = ({ app, location }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [trouble, setTrouble] = useState(false)

  const handleLogin = evt => {
    evt.preventDefault()
    app.backend.login(username, password)
  }

  const formProps = {
    intl: app.frontend.intl,
    username,
    password,
    setUsername,
    setPassword,
    trouble,
    setTrouble,
    handleLogin
  }
  let main = <LoginForm {...formProps} />
  if (trouble) main = <ResetPasswordForm {...formProps} />
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id={'app.' + (trouble ? 'troubleLoggingIn' : 'logIn')} />
      </h1>
      {location && location.state && location.state.intent ? (
        <Blockquote type="note">
          <FormattedMessage
            id="app.loginRequiredRedirect"
            values={{ page: location.state.intent }}
          />
        </Blockquote>
      ) : null}
      <div>{main}</div>
      <a href="#trouble" className="mimic" onClick={() => setTrouble(!trouble)}>
        <FormattedMessage id={'app.' + (trouble ? 'logIn' : 'troubleLoggingIn')} />
      </a>
      <span style={{ padding: '0 1rem' }}>|</span>
      <Link to="/signup">
        <FormattedMessage id="app.signUpForAFreeAccount" />
      </Link>
      <div style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <Oauth app={app} login />
      </div>
    </React.Fragment>
  )
}

export default Login
