import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Breadcrumbs from "../breadcrumbs";
import AccountMenu from "./menu";
import AccountSettings from "./settings";
import AccountAvatar from "./avatar";
import AccountBio from "./bio";

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
