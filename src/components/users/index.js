import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Profile from "./profile";
import Robot from "@freesewing/components/Robot";
import Blockquote from "@freesewing/components/Blockquote";
import LoginRequired from "../login-required";

const UsersIndex = props => {
  useEffect(() => {
    if (props.slug === "/users") props.app.frontend.setTitle(<FormattedMessage id="app.users" />);
    else {
      props.app.frontend.setTitle(props.slug.split("/").pop());
      props.app.frontend.setCrumbs([{
        slug: "/users",
        title: <FormattedMessage id="app.users" />
      }]);
    }
  }, [props.slug]);

  // FIXME: translation
  if (props.slug === "/users") {
    return (
      <LoginRequired page={props.slug}>
        <Blockquote type="note">
          <div style={{float: "left", paddingRight: "2rem"}}><Robot pose="shrug2" size={250}/></div>
          <h3>You can't just browse all users</h3>
          <p>We've got thousands of them. Surely you have better things to do?</p>
          <div style={{clear: "both"}}/>
        </Blockquote>
      </LoginRequired>
    );
  }

  return (
    <LoginRequired page={props.slug}>
      <Profile app={props.app} user={props.slug.split("/").pop()}/>
    </LoginRequired>
  );

}

export default UsersIndex;
