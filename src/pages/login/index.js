import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import LoginForm from '../../components/session/login/login-form'
import ResetPasswordForm from '../../components/session/login/reset-password-form'
import Oauth from '../../components/session/oauth/'

const Page = (props) => {
  const app = useApp()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [trouble, setTrouble] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [resend, setResend] = useState(false)

  const troubleLink = (
    <a href="#trouble" onClick={() => setTrouble(!trouble)}>
      <FormattedMessage id={'app.' + (trouble ? 'logIn' : 'troubleLoggingIn')} />
    </a>
  )
  const signUpLink = (
    <Link to="/signup" data-test="signup">
      <FormattedMessage id="app.signUpForAFreeAccount" />
    </Link>
  )
  const context = [
    <h6>
      <FormattedMessage id="app.logIn" />
    </h6>,
    <ul>
      <li>{troubleLink}</li>
      <li>{signUpLink}</li>
      <Oauth app={app} login list />
    </ul>
  ]

  const handleLogin = (evt) => {
    evt.preventDefault()
    app.setLoading(true)
    app.login(username, password).then((res) => {
      // 200 is handled in hook
      if (res !== 200) {
        if (res === 403) setInactive(true)
        else {
          app.setNotification({
            type: 'error',
            msg: app.translate(`errors.requestFailedWithStatusCode${res}`)
          })
        }
      }
    })
  }

  const handlePasswordReset = (evt) => {
    evt.preventDefault()
    app.recoverAccount(evt.target[0].value)
  }

  const handleResendActivationEmail = (evt = false) => {
    if (evt) evt.preventDefault()
    app.setLoading(true)
    app.backend
      .resendActivationEmail(username, process.env.GATSBY_LANGUAGE)
      .then((result) => {
        app.setLoading(false)
        if (result.status === 200) setResend(true)
        else {
          app.setNotification({
            type: 'warning',
            msg: app.translate('app.noSuchUser')
          })
        }
      })
      .catch((err, data) => {
        app.setLoading(false)
        console.log({ err, data })
        let msg = 'errors.requestFailedWithStatusCode500'
        if (err.response.status === 404) msg = 'app.accountRequired'
        else if (err.response.status === 400) msg = 'errors.something'
        app.setNotification({
          type: err.response.status === 404 ? 'warning' : 'error',
          msg: app.translate(msg)
        })
      })
  }

  if (inactive)
    return (
      <AppWrapper
        app={app}
        title={app.translate('app.logIn')}
        context={context}
        active="account"
        text
      >
        <Blockquote type={resend ? 'note' : 'warning'}>
          <h5>
            <FormattedMessage
              id={
                resend
                  ? 'app.checkInboxClickLinkInConfirmationEmail'
                  : 'account.accountNeedsActivation'
              }
            />
          </h5>
          <p>
            <FormattedMessage
              id={resend ? 'app.goAheadWeWillWait' : 'account.accountNeedsActivation'}
            />
          </p>
          {!resend && (
            <p>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResendActivationEmail}
                size="large"
              >
                <FormattedMessage id="app.resendActivationEmail" />
              </Button>
            </p>
          )}
        </Blockquote>
        <Blockquote type="note">
          <h6>
            <FormattedMessage id="app.askForHelp" />
          </h6>
          <p>
            <FormattedMessage id="app.joinTheChatMsg" />
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              className="info"
              href="https://chat.freesewing.org/"
            >
              <FormattedMessage id="app.askForHelp" />
            </Button>
          </p>
        </Blockquote>
      </AppWrapper>
    )

  const formProps = {
    translate: app.translate,
    username,
    password,
    setUsername,
    setPassword,
    trouble,
    setTrouble,
    handleLogin,
    handlePasswordReset
  }

  let redirect = null
  if (typeof window !== 'undefined' && location.state && location.state.intent) {
    redirect = (
      <Blockquote type="note">
        <FormattedMessage id="app.loginRequiredRedirect" values={{ page: location.state.intent }} />
      </Blockquote>
    )
  }

  let main = <LoginForm {...formProps} />
  if (trouble) main = <ResetPasswordForm {...formProps} />
  return (
    <AppWrapper
      app={app}
      title={app.translate('app.logIn')}
      context={context}
      active="account"
      text
    >
      {redirect}
      <div>{main}</div>
      <div>
        {troubleLink}
        <span style={{ padding: '0 1rem' }}>|</span>
        {signUpLink}
      </div>
      <div style={{ marginTop: '3rem' }}>
        <Oauth app={app} login />
      </div>
    </AppWrapper>
  )
}

export default Page
