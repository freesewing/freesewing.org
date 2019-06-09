import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Breadcrumbs from "../breadcrumbs";
import AccountMenu from "./menu";
import AccountSettings from "./settings";
import AccountAvatar from "./avatar";
import AccountBio from "./bio";
import AccountLanguage from "./language";
import AccountUnits from "./units";
import AccountSocial from "./social";

const Account = props => {
  const app = useContext(AppContext);

  let title = "app.account";
  let crumbs = [];
  let main = <AccountMenu mobile={app.frontend.mobile} username={app.account.username}/>
  let crumbLib = {
    account: {slug: "/account", title: <FormattedMessage id="app.account"/>},
    settings: {slug: "/account/settings", title: <FormattedMessage id="app.settings"/>},
  }

  if (props.slug === "/account/settings") {
    title = "app.settings";
    crumbs = [crumbLib.account];
    main = <AccountSettings />
  }
  else if (props.slug === "/account/settings/avatar") {
    title = "account.avatar";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountAvatar />
  }
  else if (props.slug === "/account/settings/bio") {
    title = "account.bio";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountBio />
  }
  else if (props.slug === "/account/settings/language") {
    title = "account.language";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountLanguage />
  }
  else if (props.slug === "/account/settings/units") {
    title = "account.units";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountUnits />
  }
  else if (props.slug === "/account/settings/github") {
    title = "account.github";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='github'/>
  }
  else if (props.slug === "/account/settings/instagram") {
    title = "account.instagram";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='instagram'/>
  }
  else if (props.slug === "/account/settings/twitter") {
    title = "account.twitter";
    crumbs = [crumbLib.account, crumbLib.settings];
    main = <AccountSocial type='twitter'/>
  }
  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id={title} />} />

  return (
    <React.Fragment>
      {theCrumbs}
      <h1><FormattedMessage id={title} /></h1>
      {main}
      {theCrumbs}
    </React.Fragment>
  );
};

export default Account;
