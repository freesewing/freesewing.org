import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const AccountRestrict = props => {
  const handleRestrict = key => {
    props.app.backend.restrictAccount()
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedHTMLMessage id="account.restrictProcessingOfYourDataInfo" />
      </Blockquote>
      <Blockquote type="warning">
        <h4>
          <FormattedMessage id="app.proceedWithCaution" />
        </h4>
        <p>
          <FormattedMessage id="account.restrictProcessingWarning" />
        </p>
        <p style={{ textAlign: 'right' }}>
          <Button href="/account/settings" variant="outlined" color="primary">
            <FormattedMessage id="app.back" />
          </Button>
        </p>
      </Blockquote>

      <p style={{ textAlign: props.app.frontend.mobile ? 'left' : 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings">
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          className="danger"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={handleRestrict}
        >
          <FormattedHTMLMessage id="account.restrictProcessingOfYourData" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountRestrict
