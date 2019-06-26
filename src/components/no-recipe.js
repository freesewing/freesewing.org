import React from "react";
import Blockquote from "@freesewing/components/Blockquote";

const NoRecipe = props => {

  // FIXME: this needs to be translated
  return (
    <Blockquote type="note">
      <h6>Start by drafting a pattern</h6>
      <p>You don't have any recipes (yet). Draft a pattern, then save its recipe.</p>
    </Blockquote>
  );
}

export default NoRecipe;
