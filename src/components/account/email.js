import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import validateEmail from '@freesewing/utils/validateEmail'
import validateTld from '@freesewing/utils/validateTld'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const AccountEmail = props => {
  const [email, setEmail] = useState(props.app.account.email || '')
  const [emailValid, setEmailValid] = useState(true)

  const updateEmail = evt => {
    let value = evt.target.value
    setEmail(value)
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid)
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id={'account.emailInfo'} />
      </Blockquote>
      <TextField
        id="email"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'account.email' })}
        margin="normal"
        variant="outlined"
        value={email}
        type="text"
        onChange={updateEmail}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {emailValid ? (
                <ValidIcon style={{ color: '#40c057' }} data-test='valid'/>
              ) : (
                <InvalidIcon color="error" data-test="invalid"/>
              )}
            </InputAdornment>
          )
        }}
      />
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings" data-test="cancel">
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="save"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() =>
            props.app.backend.saveAccount(
              { email: email },
              props.app.frontend.intl.formatMessage({ id: 'account.email' })
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountEmail
