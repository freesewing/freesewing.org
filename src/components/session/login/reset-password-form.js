import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

const ResetPasswordForm = props => (
  <React.Fragment>
    <div style={{ textAlign: 'left' }}>
      <ul>
        <li data-test='trouble1'>
          <FormattedHTMLMessage id="app.emailWorksToo" />
        </li>
        <li data-test='trouble2'>
          <FormattedHTMLMessage id="app.forgotLoginInstructions" />.
        </li>
      </ul>
    </div>
    <form onSubmit={props.handlePasswordReset}>
      <TextField
        id="username"
        name="username"
        autoFocus={true}
        fullWidth={true}
        autoComplete="username"
        label={props.intl.formatMessage({ id: 'account.email' })}
        margin="normal"
        variant="outlined"
      />
      <Button
        type="submit"
        color="primary"
        size="large"
        variant="contained"
        style={{ margin: '2rem 0' }}
      >
        <FormattedMessage id="app.resetPassword" />
      </Button>
    </form>
  </React.Fragment>
)

export default ResetPasswordForm
