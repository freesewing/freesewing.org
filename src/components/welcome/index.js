import React from "react";
import { FormattedMessage } from "react-intl";
import { camelCase } from "@freesewing/utils";
import Breadcrumbs from "../breadcrumbs";
import LoginRequired from "../login-required";
import Button from "@material-ui/core/Button";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import LinearProgress from '@material-ui/core/LinearProgress';
import Units from "./units";
import Username from "./username";
import Avatar from "./avatar";
import Bio from "./bio";
import Social from "./social";
import { navigate } from "gatsby";

const Welcome = ({ slug, app }) => {

  const renderSteps = () => {
    const steps = {
      units: "Select the units you want to use",
      username: "Pick a username",
      avatar: "Add a profile picture",
      bio: "Tell us a little bit about yourself",
      social: "Let us know where we can follow you",
    };

    const items = [];
    for (let step in steps) items.push(<li key={step}>{steps[step]}</li>);

    return <ol>{items}</ol>
  }

  const continueButton = (next, field = false, data = null) => {
    return (
      <p style={{textAlign: app.frontend.mobile ? "left" : "right"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            data,
            app.frontend.intl.formatMessage({id: "account."+camelCase(field)}),
            (next === "ready" ? "/account" : "/welcome/"+next)
          )}
        >
          <FormattedMessage id="app.continue" />
          <RightIcon style={{marginLeft: "1rem"}}/>
        </Button>
      </p>
    );
  }

  const progressBar = pct => {
    return <LinearProgress color="primary" value={pct} variant="determinate" />
  }

  let crumbs = [];
  let title = "email.signupTitle";
  let pct = 5;
  let main = (
    <React.Fragment>
      <p>
        <FormattedMessage id="app.letUsSetupYourAccount" />.
        We'll walk you through the following steps:
      </p>
      {renderSteps()}
      <p>While all these steps are optional, we recommend you go through them to get the most out of FreeSewing.</p>
      <p style={{textAlign: app.frontend.mobile ? "left" : "right"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          href="/welcome/units"
        >
          <FormattedMessage id="app.continue" />
          <RightIcon style={{marginLeft: "1rem"}}/>
        </Button>
      </p>
    </React.Fragment>
  );
  const welcomeCrumb = { slug: "/welcome", title: <FormattedMessage id="app.welcome"/> }

  const childProps = {
    app,
    continueButton,
  }
  if (slug === "/welcome/units") {
    title = "account.unitsTitle";
    crumbs = [welcomeCrumb];
    main = <Units {...childProps} />
    pct = 24;
  }
  else if (slug === "/welcome/username") {
    title = "account.usernameTitle";
    crumbs = [welcomeCrumb];
    main = <Username {...childProps} />
    pct = 43;
  }
  else if (slug === "/welcome/avatar") {
    title = "account.avatarTitle";
    crumbs = [welcomeCrumb];
    main = <Avatar {...childProps} />
    pct = 62;
  }
  else if (slug === "/welcome/bio") {
    title = "account.bioTitle";
    crumbs = [welcomeCrumb];
    main = <Bio {...childProps} />
    pct = 81;
  }
  else if (slug === "/welcome/social") {
    title = "account.socialTitle";
    crumbs = [welcomeCrumb];
    main = <Social {...childProps} />
    pct = 100;
  }
  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id={title} />} />

  return (
    <LoginRequired page={slug}>
      {theCrumbs}
      {progressBar(pct)}
      <h1><FormattedMessage id={title} /></h1>
      {main}
      {theCrumbs}
    </LoginRequired>
  );
};

export default Welcome;
