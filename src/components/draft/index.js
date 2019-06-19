import React from "react";
import { FormattedMessage } from "react-intl";
import LoginRequired from "../login-required";
import SelectPatternPage from "./select-pattern";
import SelectModelPage from "./select-model";

const DraftIndex = props => {
  let main = null;
  let chunks = [];
  if (props.slug === "/draft") {
    main = <SelectPatternPage app={props.app} />
  } else {
    chunks = props.slug.split('/');
    if (chunks.length === 3) {
      main = <SelectModelPage app={props.app} pattern={chunks[2]} />
    }
  }

  return (
    <LoginRequired page={props.slug}>
      {main}
    </LoginRequired>
  );
}

export default DraftIndex;
