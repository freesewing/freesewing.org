import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Breadcrumbs from "../breadcrumbs";
import AccountMenu from "./menu";

const Account = props => {
  const app = useContext(AppContext);

  const crumbs = [];

  return (
    <React.Fragment>
      <Breadcrumbs
        crumbs={crumbs}
        pageTitle={<FormattedMessage id="app.account" />}
      />
      <h1><FormattedMessage id="app.account" /></h1>
      <AccountMenu mobile={app.frontend.mobile} username={app.account.username}/>
      <Breadcrumbs
        crumbs={crumbs}
        pageTitle={<FormattedMessage id="app.account" />}
      />

    </React.Fragment>
  );
};

export default Account;
