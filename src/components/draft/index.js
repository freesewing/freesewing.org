import React from "react";
import LoginRequired from "../login-required";
import SelectPatternPage from "./select-pattern";
import SelectModelPage from "./select-model";
import SelectRecipeModelPage from "./select-recipe-model";
import DraftPage from "./draft";

const DraftIndex = props => {
  let main = null;
  let chunks = [];
  if (
    props.slug === "/create" ||
    props.slug === "/create/" ||
    props.slug === "/recreate" ||
    props.slug === "/recreate/"
  ) {
    main = <SelectPatternPage app={props.app} />
  } else {
    chunks = props.slug.split('/');
    if (chunks.length < 4) {
      if (chunks[1] === "recreate") main = <SelectRecipeModelPage app={props.app} recipe={chunks[2]} slug={props.slug}/>
      else main = <SelectModelPage app={props.app} pattern={chunks[2]} />
    } else {
      let draftProps = {
        mainMenu: props.mainMenu,
        userMenu: props.userMenu,
        mobileIcons: props.mobileIcons,
        app: props.app,
      }
      if (chunks.length === 4 && chunks[1] === "recreate" && chunks[3] === "replica") {
        main = <DraftPage {...draftProps} recreate recipe={chunks[2]} model="replica" />
      } else if (chunks.length === 5 && chunks[3] === "for") {
        if (chunks[1] === "recreate") main = <DraftPage {...draftProps} recreate recipe={chunks[2]} model={chunks[4]} />
        else main = <DraftPage {...draftProps} model={chunks[4]} pattern={chunks[2]} />
      }
    }
  }

  return (
    <LoginRequired page={props.slug}>
      {main}
    </LoginRequired>
  );
}

export default DraftIndex;
