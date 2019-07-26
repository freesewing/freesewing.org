import React from "react";
import Blockquote from "@freesewing/components/Blockquote";
import { FormattedMessage } from "react-intl";

const NoModel = props => {

  return (
    <Blockquote type="note">
      <h6><FormattedMessage id="app.modelFirst" /></h6>
      <p><FormattedMessage id="app.noModel" /></p>
      <p><FormattedMessage id="app.noModel2" /></p>
    </Blockquote>
  );
}

export default NoModel;
