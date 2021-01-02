import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [username, setUsername] = useState(app.account.username)
  const [usernameValid, setUsernameValid] = useState(true)

  const updateUsername = (evt) => {
    let value = evt.target.value
    setUsername(value)
    app.isUsernameAvailable(value).then((result) => setUsernameValid(result))
  }

  return (
    <AppWrapper app={app} title={app.translate('account.username')} {...app.treeProps(props.path)}>
      <TextField
        id="username"
        fullWidth={true}
        label={app.translate('account.username')}
        margin="normal"
        variant="outlined"
        value={username}
        type="text"
        onChange={updateUsername}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {usernameValid ? (
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
          disabled={!usernameValid}
          onClick={() => app.updateAccount([username, 'username'], '/account/settings/')}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <Blockquote type="note">
        <FormattedMessage
          id={'account.usernameInfo'}
          values={{ em: (...chunks) => <em>{chunks}</em> }}
        />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
