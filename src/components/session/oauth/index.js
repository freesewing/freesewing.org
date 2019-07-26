import React from "react";
import Provider from "./provider";
import oauthConfig from "../../../config/oauth";

const Oauth = props => {
  const handleSignup = provider => {
    props.app.frontend.startLoading();
    props.app.backend.initOauth({
      provider: provider,
      language: process.env.GATSBY_LANGUAGE
    }, handleResult);
  }
  const handleResult = (backendResult, provider, data = false) => {
    if (backendResult) window.location = oauthConfig[provider] + data.state;
    else console.log(backendResult);
  }

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }
  }

  return (
    <div style={styles.wrapper}>
      <Provider provider="google" login={props.login} app={props.app} signup={() => handleSignup("google")}/>
      <Provider provider="github" login={props.login} app={props.app} signup={() => handleSignup("github")}/>
    </div>
  );
}

export default Oauth;
