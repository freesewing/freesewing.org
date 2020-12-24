import React, { useState } from 'react'
import Mdx from '../../mdx'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

import './newsletter.scss'

const Newsletter = ({ app, uiMdx }) => {
  const [email, setEmail] = useState(app.account.email || '')
  const [emailValid, setEmailValid] = useState(app.account && app.account.username ? true : false)
  const [subscribed, setSubscribed] = useState(false)

  const updateEmail = (evt) => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }
  if (app.account && app.account.newsletter) return null

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

  return (
    <div className="newsletter">
      <div className="inner">
        <div>
          <Mdx node={uiMdx['homepage/newsletter']} />
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
          {!loggedIn && !subscribed && (
            <TextField
              id="email"
              fullWidth={true}
              label={app.translate('account.email')}
              margin="normal"
              variant="outlined"
              color="secondary"
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
                color="secondary"
                fullWidth
                disabled={!emailValid}
              >
                <FormattedMessage id="app.subscribe" />
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Newsletter
