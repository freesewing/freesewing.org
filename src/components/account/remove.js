import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const AccountRemove = props => {
  const handleRemove = key => {
    props.app.backend.removeAccount()
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedHTMLMessage id="account.removeYourAccountInfo" />
      </Blockquote>
      <Blockquote type="warning">
        <h4>
          <FormattedMessage id="app.proceedWithCaution" />
        </h4>
        <p>
          <FormattedMessage id="account.removeYourAccountWarning" />
        </p>
        <p style={{ textAlign: 'right' }}>
          <Button href="/account/settings" variant="outlined" color="primary" data-test="back">
            <FormattedMessage id="app.back" />
          </Button>
        </p>
      </Blockquote>

      <p style={{ textAlign: props.app.frontend.mobile ? 'left' : 'right' }}>
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
          className="danger"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={handleRemove}
        >
          <FormattedHTMLMessage id="account.removeYourAccount" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountRemove
