import React from "react";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../breadcrumbs";
import LoginRequired from "../login-required";
import RecipesList from "./list";
import RecipePage from "./show";
import EditNamePage from "./edit-name";
import EditNotesPage from "./edit-notes";

const RecipeIndex = props => {
  let title = "app.recipes";
  let crumbs = [];
  let main = <RecipesList app={props.app} />
  let recipesCrumb = {slug: "/recipes", title: <FormattedMessage id="app.recipes"/>}

  if (props.slug !== "/recipes") {
    let chunks = props.slug.split("/");
    let recipe = chunks[2];
    if (typeof props.app.recipes[recipe] === "undefined") {
      title = <FormattedMessage id="app.pleaseWait" />
      crumbs = [recipesCrumb];
      main = <pre>{JSON.stringify(props.app.recipes, null, 2)}</pre>
    } else {
      if (chunks.length === 3) {
        title = props.app.recipes[recipe].name;
        crumbs = [recipesCrumb];
        main = <RecipePage recipe={recipe} app={props.app} />
      }
      else if (chunks.length === 4) {
        if (chunks[3] === "name") {
          title = <FormattedMessage id="app.name" />
          crumbs = [recipesCrumb, {slug: "/recipes/"+recipe, title: props.app.recipes[recipe].name}];
          main = <EditNamePage recipe={recipe} app={props.app} />
        } else {
          title = <FormattedMessage id="app.notes" />
          crumbs = [recipesCrumb, {slug: "/recipes/"+recipe, title: props.app.recipes[recipe].name}];
          main = <EditNotesPage recipe={recipe} app={props.app} />
        }
      }
    }
  }
  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id={title} />} />

  return (
    <LoginRequired page={props.slug}>
      {theCrumbs}
      <h1><FormattedMessage id={title} /></h1>
      {main}
      {theCrumbs}
    </LoginRequired>
  );
}

export default RecipeIndex;
