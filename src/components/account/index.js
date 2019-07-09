import React from "react";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../breadcrumbs";
import LoginRequired from "../login-required";
import AccountMenu from "./menu";
import AccountSettings from "./settings";
import AccountAvatar from "./avatar";
import AccountBio from "./bio";
import AccountLanguage from "./language";
import AccountUnits from "./units";
import AccountSocial from "./social";
import AccountEmail from "./email";
import AccountUsername from "./username";
import AccountPassword from "./password";
import AccountExport from "./export";
import AccountConsent from "./consent";
import AccountRestrict from "./restrict";

const Account = props => {
  let title = "app.account";
  let crumbs = [];
  let main = <AccountMenu
    mobile={props.app.frontend.mobile}
    username={props.app.account.username}
    intl={props.app.frontend.intl}
  />
  let crumbLib = {
    account: {slug: "/account", title: <FormattedMessage id="app.account"/>},
    settings: {slug: "/account/settings", title: <FormattedMessage id="app.settings"/>},
  }

  if (props.slug === "/account/settings") {
    title = "app.settings";
    crumbs = [crumbLib.account];
    main = <AccountSettings app={props.app} />
  }
  else if (props.slug === "/account/settings/avatar") {
    title = "account.avatar";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountAvatar app={props.app} />
  }
  else if (props.slug === "/account/settings/bio") {
    title = "account.bio";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountBio  app={props.app} />
  }
  else if (props.slug === "/account/settings/language") {
    title = "account.language";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountLanguage  app={props.app} />
  }
  else if (props.slug === "/account/settings/units") {
    title = "account.units";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountUnits  app={props.app} />
  }
  else if (props.slug === "/account/settings/github") {
    title = "account.github";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='github' app={props.app} />
  }
  else if (props.slug === "/account/settings/instagram") {
    title = "account.instagram";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='instagram' app={props.app} />
  }
  else if (props.slug === "/account/settings/twitter") {
    title = "account.twitter";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='twitter' app={props.app} />
  }
  else if (props.slug === "/account/settings/email") {
    title = "account.email";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountEmail app={props.app}  />
  }
  else if (props.slug === "/account/settings/username") {
    title = "account.username";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountUsername  app={props.app} />
  }
  else if (props.slug === "/account/settings/password") {
    title = "account.password";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountPassword  app={props.app} />
  }
  else if (props.slug === "/account/export") {
    title = "account.exportYourData";
    crumbs = [crumbLib.account];
    main = <AccountExport app={props.app}/>
  }
  else if (props.slug === "/account/consent") {
    title = "account.reviewYourConsent";
    crumbs = [crumbLib.account];
    main = <AccountConsent app={props.app}/>
  }
  else if (props.slug === "/account/restrict") {
    title = "account.restrictProcessingOfYourData";
    crumbs = [crumbLib.account];
    main = <AccountRestrict app={props.app}/>
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
};

export default Account;
