import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const AccountSocial = props => {
  const [social, setSocial] = useState(
    props.app.account.social ? props.app.account.social[props.type] : ''
  )

  const updateSocial = evt => setSocial(evt.target.value)

  const saveSocial = () => {
    let data = { social: {} }
    data.social[props.type] = social
    props.app.backend.saveAccount(
      data,
      props.app.frontend.intl.formatMessage({ id: 'account.' + props.type })
    )
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id={'account.' + props.type + 'Info'} />
      </Blockquote>
      <TextField
        id="social"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'account.' + props.type })}
        margin="normal"
        variant="outlined"
        value={social}
        type="text"
        onChange={updateSocial}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>
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
          onClick={saveSocial}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountSocial
