import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [email, setEmail] = useState(app.account.email || '')
  const [emailValid, setEmailValid] = useState(true)

  const updateEmail = (evt) => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }

  return (
    <AppWrapper app={app} title={app.translate('account.email')} {...app.treeProps(props.path)}>
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
    </AppWrapper>
  )
}

export default Page
