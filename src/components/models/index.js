import React from "react";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../breadcrumbs";
import LoginRequired from "../login-required";
import ModelList from "./list";
import ModelPage from "./show";
import EditNamePage from "./edit-name";
import EditNotesPage from "./edit-notes";
import EditMeasurementPage from "./edit-measurement";

const ModelIndex = props => {
  let title = "app.models";
  let crumbs = [];
  let main = <ModelList app={props.app} />
  let modelsCrumb = {slug: "/models", title: <FormattedMessage id="app.models"/>}

  if (props.slug !== "/models") {
    let chunks = props.slug.split("/");
    let model = chunks[2];
    if (props.app.models[model] === "undefined") {
      // FIXME: Handle missing modle
    }
    if (chunks.length === 3) {
      if (typeof props.app.models[model] === "undefined") {
        // Too soon?
      } else {
        title = props.app.models[model].name;
        crumbs = [modelsCrumb];
        main = <ModelPage model={model} app={props.app} />
      }
    }
    else if (chunks.length === 4) {
      if (chunks[3] === "name") {
        title = <FormattedMessage id="app.name" />
        crumbs = [modelsCrumb, {slug: "/models/"+model, title: props.app.models[model].name}];
        main = <EditNamePage model={model} app={props.app} />
      } else {
        title = <FormattedMessage id="app.notes" />
        crumbs = [modelsCrumb, {slug: "/models/"+model, title: props.app.models[model].name}];
        main = <EditNotesPage model={model} app={props.app} />
      }
    }
    else if (chunks.length === 5) {
      let measurement = chunks[4];
      title = <FormattedMessage id={"measurements."+measurement} />
      crumbs = [modelsCrumb, {slug: "/models/"+model, title: props.app.models[model].name}];
      main = <EditMeasurementPage model={model} measurement={measurement} app={props.app} />
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

export default ModelIndex;
