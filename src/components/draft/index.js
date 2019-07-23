import React from "react";
import LoginRequired from "../login-required";
import SelectPatternPage from "./select-pattern";
import SelectModelPage from "./select-model";
import SelectRecipeModelPage from "./select-recipe-model";
import DraftPage from "./draft";
import UserMenu from "../user-menu";
import VisitorMenu from "../visitor-menu";
//import RecreatePage from "./recreate";

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
    if (chunks.length === 3) {
      if (chunks[1] === "recreate") main = <SelectRecipeModelPage app={props.app} recipe={chunks[2]} slug={props.slug}/>
      else main = <SelectModelPage app={props.app} pattern={chunks[2]} />
    }
    else if (chunks.length === 4 && chunks[1] === "recreate" && chunks[3] === "replica") {
      main = <DraftPage
        mainMenu={props.mainMenu}
        userMenu={props.app.account.username
          ? <UserMenu mobile={props.app.frontend.mobile} intl={props.app.frontend.intl} slug={props.slug} />
          : <VisitorMenu />
        }
        mobileIcons={props.mobileIcons}
        recreate
        app={props.app}
        recipe={chunks[2]}
        model="replica"
        />
    } else if (chunks.length === 5 && chunks[3] === "for") {
      if (chunks[1] === "recreate") main = <DraftPage
        mainMenu={props.mainMenu}
        userMenu={props.app.account.username
          ? <UserMenu mobile={props.app.frontend.mobile} intl={props.app.frontend.intl} slug={props.slug} />
          : <VisitorMenu />
        }
        mobileIcons={props.mobileIcons}
        recreate
        app={props.app}
        recipe={chunks[2]}
        model={chunks[4]}
        />
      else main = <DraftPage app={props.app} model={chunks[4]} pattern={chunks[2]} />
    }
  }

  return (
    <LoginRequired page={props.slug}>
      {main}
    </LoginRequired>
  );
}

export default DraftIndex;
