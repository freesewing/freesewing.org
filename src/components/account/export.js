import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const AccountExport = ({ app }) => (
  <React.Fragment>
    <Blockquote type="note">
      <FormattedHTMLMessage id="account.exportYourDataInfo" />
    </Blockquote>
    <h6 style={{ textAlign: app.frontend.mobile ? 'left' : 'right' }}>
      <FormattedMessage id="account.exportYourDataTitle" />
    </h6>
    <p style={{ textAlign: app.frontend.mobile ? 'left' : 'right' }}>
      <Button size="large" variant="outlined" color="primary" href="/account/settings" data-test="cancel">
        <FormattedMessage id="app.cancel" />
      </Button>
      <Button
        data-test="export"
        size="large"
        style={{ marginLeft: '1rem' }}
        variant="contained"
        color="primary"
        onClick={app.backend.exportAccount}
      >
        <FormattedMessage id="account.exportYourData" />
      </Button>
    </p>
  </React.Fragment>
)

export default AccountExport
