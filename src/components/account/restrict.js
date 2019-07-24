import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";

const AccountRestrict = ({ app }) => (
  <React.Fragment>
   FIXME: This is not yet implemented
    <FormattedMessage id="app.proceedWithCaution" />
    <Blockquote type="note">
      <FormattedHTMLMessage id="account.restrictProcessingOfYourDataInfo" />
    </Blockquote>
    <h5 style={{textAlign: app.frontend.mobile ? "left" : "right"}}>
      <FormattedMessage id="account.restrictProcessingOfYourData" />
    </h5>
    <p style={{textAlign: app.frontend.mobile ? "left" : "right"}}>
      <Button
        size="large"
        variant="outlined"
        color="primary"
        href="/account/settings"
      >
        <FormattedMessage id="app.cancel" />
      </Button>
      <Button
        size="large"
        style={{marginLeft: '1rem'}}
        variant="contained"
        color="primary"
        onClick={app.backend.exportAccount}
      >
        <FormattedMessage id="account.exportYourData" />
      </Button>
    </p>
  </React.Fragment>
);

export default AccountRestrict;
