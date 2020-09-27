import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'
import AccountContext from '../../../components/context/account'

const EmailSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.email'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
    app.setContext(<AccountContext app={app} />)
  }, [])

  // State
  const [email, setEmail] = useState(app.account.email || '')
  const [emailValid, setEmailValid] = useState(true)

  // Methods
  const updateEmail = (evt) => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }

  // Logic

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <Blockquote type="note">
          <FormattedMessage id={'account.emailInfo'} />
        </Blockquote>
        <TextField
          id="email"
          fullWidth={true}
          label={app.translate('account.email')}
          margin="normal"
          variant="outlined"
          value={email}
          type="text"
          onChange={updateEmail}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {emailValid ? (
                  <ValidIcon style={{ color: '#40c057' }} data-test="valid" />
                ) : (
                  <InvalidIcon color="error" data-test="invalid" />
                )}
              </InputAdornment>
            )
          }}
        />
        <p style={{ textAlign: 'right' }}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href="/account/settings"
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            data-test="save"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([email, 'email'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(EmailSettingPage)
