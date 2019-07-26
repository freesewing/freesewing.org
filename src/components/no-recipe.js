import React from "react";
import Blockquote from "@freesewing/components/Blockquote";
import { FormattedMessage } from "react-intl";

const NoRecipe = props => {

  return (
    <Blockquote type="note">
      <h6><FormattedMessage id="app.createFirst" /></h6>
      <p><FormattedMessage id="app.noRecipe" /></p>
    </Blockquote>
  );
}

export default NoRecipe;
