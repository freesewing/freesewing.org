import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import { FormattedMessage } from "react-intl";
import LoginForm from "./login-form";
import ResetPasswordForm from "./reset-password-form";
import Blockquote from "@freesewing/components/Blockquote";
import Oauth from "../oauth/";
import Breadcrumbs from "../../breadcrumbs";

const Callback = props => {
  const handleResult = (result, signup) => {
    if (result) {
      if (signup) navigate("/welcome");
      else navigate("/account");
    } else {
      // FIXME: Handle error
      console.log(result, signup);
    }
  }

  useEffect(() => {
    const chunks = props.slug.split("/");
    const validation = chunks.pop();
    const confirmation = chunks.pop();
    props.app.backend.loginOauth({validation, confirmation}, handleResult);

  }, []);
  /*
  login = (confirmation, validation) => {
    backend
      .providerLogin({ confirmation, validation })
      .then(res => {
        if (res.status === 200) {
          this.props.setUserAccount(res.data.account);
          this.props.setModels(res.data.models);
          this.props.setDrafts(res.data.drafts);
          saveToken(res.data.token);
          let to = "/account";
          if (res.data.signup) to = "/welcome";
          navigate(locLang.set(to, this.props.pageContext.language));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    let validation = chunks.pop();
    let confirmation = chunks.pop();
    this.login(confirmation, validation);
  }
  */
  props.app.frontend.startLoading();
  const crumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.logIn" />} />

  return (
    <React.Fragment>
      {crumbs}
      <h1><FormattedMessage id="app.justAMoment" /></h1>
    </React.Fragment>
  );
};

export default Callback;
