import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentReveal, setCurrentReveal] = useState(false)
  const [newReveal, setNewReveal] = useState(false)

  return (
    <AppWrapper app={app} title={app.translate('account.password')} {...app.treeProps(props.path)}>
      <TextField
        id="newPassword"
        fullWidth={true}
        label={app.translate('account.newPassword')}
        margin="normal"
        variant="outlined"
        value={newPassword}
        type={newReveal ? 'text' : 'password'}
        onChange={(evt) => setNewPassword(evt.target.value)}
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
          onClick={() => app.updateAccount([newPassword, 'password'], '/account/settings/')}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
