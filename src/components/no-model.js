import React from "react";
import Blockquote from "@freesewing/components/Blockquote";

const NoModel = props => {

  // FIXME: this needs to be translated
  return (
    <Blockquote type="note">
      <h6>Start by creating a model</h6>
      <p>You don't have any models (yet). FreeSewing generates made-to-measure
    sewing patterns. And we can't generate any patterns if we don't have measurements.</p>
    <p>So the first thing you should do is create a model with your measurments,
    or the measurements of the person you want to generate a pattern for.</p>
    </Blockquote>
  );
}

export default NoModel;
