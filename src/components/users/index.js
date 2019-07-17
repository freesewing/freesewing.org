import React from "react";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../breadcrumbs";
import Profile from "./profile";
import Robot from "@freesewing/components/Robot";
import Blockquote from "@freesewing/components/Blockquote";
import LoginRequired from "../login-required";

const UsersIndex = props => {

  // FIXME: translation
  if (props.slug === "/users") {
    let theCrumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.users" />} />
    return (
      <LoginRequired page={props.slug}>
        {theCrumbs}
        <h1><FormattedMessage id="app.users" /></h1>
        <Blockquote type="note">
          <div style={{float: "left", paddingRight: "2rem"}}><Robot pose="shrug2" size={250}/></div>
          <h3>You can't just browse all users</h3>
          <p>We've got thousands of them. Surely you have better things to do?</p>
          <div style={{clear: "both"}}/>
        </Blockquote>
        {theCrumbs}
      </LoginRequired>
    );
  }

  let username = props.slug.split("/").pop();
  let crumbs = [{slug: "/users", title: <FormattedMessage id="app.users"/>}]
  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={username} />

    return (
      <LoginRequired page={props.slug}>
        {theCrumbs}
        <Profile app={props.app} user={props.slug.split("/").pop()}/>
        {theCrumbs}
      </LoginRequired>
    );

}

export default UsersIndex;
