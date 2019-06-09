import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Breadcrumbs from "../breadcrumbs";
import AccountMenu from "./menu";
import AccountSettings from "./settings";

const Account = props => {
  const app = useContext(AppContext);

  let title = "app.account";
  let crumbs = [];
  let main = <AccountMenu mobile={app.frontend.mobile} username={app.account.username}/>

  if (props.slug === "/account/settings") {
    title = "app.settings";
    crumbs = [{slug: "/account", title: <FormattedMessage id="app.account"/>}];
    main = <AccountSettings />
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
