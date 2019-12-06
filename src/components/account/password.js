import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const AccountPassword = props => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentReveal, setCurrentReveal] = useState(false)
  const [newReveal, setNewReveal] = useState(false)

  const updateNewPassword = evt => setNewPassword(evt.target.value)

  return (
    <React.Fragment>
      <TextField
        id="newPassword"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'account.newPassword' })}
        margin="normal"
        variant="outlined"
        value={newPassword}
        type={newReveal ? 'text' : 'password'}
        onChange={updateNewPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span
                role="img"
                aria-label="reveal"
                onClick={() => setNewReveal(!newReveal)}
                className="poh"
              >
                {newReveal ? (
                  <span role="img" aria-label="show" data-test="show">
                    👀{' '}
                  </span>
                ) : (
                  <span role="img" aria-label="show" data-test="hide">
                    🙈{' '}
                  </span>
                )}
              </span>
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
          onClick={() =>
            props.app.backend.saveAccount(
              { password: newPassword },
              props.app.frontend.intl.formatMessage({ id: 'account.password' })
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountPassword
