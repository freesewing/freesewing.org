import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import successGif from './success.gif'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import Blockquote from '@freesewing/components/Blockquote'
import Oauth from '../oauth/'

const Signup = ({ app, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [result, setResult] = useState(false)
  const [error, setError] = useState(false)
  const [trouble, setTrouble] = useState(false)
  useEffect(() => {
    app.frontend.setTitle(app.frontend.intl.formatMessage({id:'app.signUp'}))
  }, [location])

  const handleSignup = evt => {
    evt.preventDefault()
    app.backend.signup(email, password, process.env.GATSBY_LANGUAGE, handleResult)
  }

  const handleResend = evt => {
    evt.preventDefault()
    app.backend.resendActivationEmail(email, process.env.GATSBY_LANGUAGE, handleResult)
  }

  const handleResult = (backendResult, data = false) => {
    if (!backendResult) {
      let msg = 'errors.requestFailedWithStatusCode500'
      if (data.data === 'userExists') msg = 'errors.emailExists'
      setError(<FormattedMessage id={msg} />)
    }
    setResult(backendResult)
  }

  const updateEmail = evt => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }

  const styles = {
    wrapper: {
      maxWidth: '500px'
    }
  }

  const success = (
    <React.Fragment>
      <h2>
        <FormattedMessage id="app.yay" />
        &nbsp;
        <FormattedMessage id="app.goodJob" />
      </h2>
      <p>
        <FormattedMessage id="app.checkInboxClickLinkInConfirmationEmail" />
      </p>
      <img src={successGif} alt="Yay!" />
      <p>
        <FormattedMessage id="app.goAheadWeWillWait" />
      </p>
    </React.Fragment>
  )

  const form = (
    <form onSubmit={trouble ? handleResend : handleSignup} style={styles.wrapper}>
      {!result && error ? <Blockquote type="warning">{error}</Blockquote> : null}
      <h6>
        { trouble
        ? <FormattedMessage id="app.resendActivationEmailMessage" />
        : <FormattedMessage id="app.enterEmailPickPassword" />
        }
      </h6>
      <TextField
        id="email"
        fullWidth={true}
        autoFocus={true}
        label={app.frontend.intl.formatMessage({ id: 'account.email' })}
        helperText={app.frontend.intl.formatMessage({ id: 'app.weNeverShareYourEmail' })}
        margin="normal"
        variant="outlined"
        value={email}
        type="text"
        onChange={updateEmail}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {emailValid ? (
                <ValidIcon style={{ color: '#40c057' }} data-test='email-valid'/>
              ) : (
                <InvalidIcon color="error" data-test='email-invalid'/>
              )}
            </InputAdornment>
          )
        }}
      />
      {!trouble && (
      <TextField
        id="password"
        fullWidth={true}
        type={reveal ? 'text' : 'password'}
        autoComplete="password"
        label={app.frontend.intl.formatMessage({ id: 'account.password' })}
        helperText={app.frontend.intl.formatMessage({ id: 'app.noPasswordPolicy' })}
        margin="normal"
        variant="outlined"
        value={password}
        onChange={evt => setPassword(evt.target.value)}
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
                  <span role="img" aria-label="show" data-test='show-password'>
                    👀{' '}
                  </span>
                ) : (
                  <span role="img" aria-label="show" data-test='hide-password'>
                    🙈{' '}
                  </span>
                )}
              </span>
            </InputAdornment>
          )
        }}
      />) }
      <Button
        type="submit"
        color="primary"
        size="large"
        variant="contained"
        style={{ margin: '2rem 0 0.5rem' }}
        disabled={!emailValid || (password.length<1 && !trouble)}
      >
        {trouble
          ? <FormattedMessage id="app.resendActivationEmail" />
          : <FormattedMessage id="app.signUp" />
        }
      </Button>
      <div style={{margin: '1rem 0 2rem'}}>
        <a href="#trouble" onClick={() => setTrouble(!trouble)} data-test='trouble'>
          {trouble
            ? <FormattedMessage id='app.signUp' />
            : <FormattedMessage id='app.resendActivationEmail' />
          }
        </a>
        <span style={{ padding: '0 1rem' }}>|</span>
        <Link to="/login" data-test='login'>
          <FormattedMessage id="app.logIn" />
        </Link>
      </div>
      <Oauth app={app} />
    </form>
  )

  return result ? success : form
}

export default Signup
