import React, { useState } from 'react'
import Mdx from '../mdx'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

import './newsletter.scss'

const Newsletter = ({ app, uiMdx, homepage = false }) => {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const updateEmail = (evt) => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }
  const subscribe = () => {
    if (loggedIn) app.updateAccount([true, 'newsletter'])
    else {
      app.backend
        .newsletterSubscribe(email)
        .then((res) => {
          if (res.status === 200) {
            app.setNotification({
              type: 'success',
              msg: app.translate('app.yay')
            })
            setSubscribed(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  let loggedIn = false
  if (app.account && app.account.username) loggedIn = true

  const core = (
    <div>
      <Mdx node={uiMdx['newsletter']} />
      {subscribed && (
        <>
          <h5>
            <FormattedMessage id="app.yay" />
          </h5>
          <p>
            <FormattedMessage id="app.checkInboxClickLinkInConfirmationEmail" />
          </p>
        </>
      )}
      {!subscribed && (
        <TextField
          id="email"
          fullWidth={true}
          label={app.translate('account.email')}
          margin="normal"
          variant="outlined"
          color={homepage ? 'secondary' : 'primary'}
          value={email}
          type="text"
          onChange={updateEmail}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {emailValid ? (
                  <ValidIcon style={{ color: '#40c057', maxWidth: '24px' }} data-test="valid" />
                ) : (
                  <InvalidIcon
                    color="error"
                    data-test="invalid"
                    style={{ color: '#ff6b6b', maxWidth: '24px' }}
                  />
                )}
              </InputAdornment>
            )
          }}
        />
      )}
      {!subscribed && (
        <p className="button">
          <Button
            onClick={subscribe}
            variant="contained"
            color={homepage ? 'secondary' : 'primary'}
            fullWidth={homepage}
            disabled={!emailValid}
            size="large"
          >
            <FormattedMessage id="app.subscribe" />
          </Button>
        </p>
      )}
    </div>
  )

  if (!homepage) return core
  return (
    <div className="newsletter">
      <div className="inner">{core}</div>
    </div>
  )
}

export default Newsletter
