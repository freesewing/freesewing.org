import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { injectIntl, FormattedMessage } from "react-intl";
import LoginForm from "./login-form";
import ResetPasswordForm from "./reset-password-form";
import AppContext from "../../../context/app.js";
import Blockquote from "@freesewing/components/Blockquote";

const Login = props => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [trouble, setTrouble] = useState(false);
  const app = useContext(AppContext);

  const handleLogin = evt => {
    evt.preventDefault();
    app.backend.login(username, password);
  }

  const formProps = {
    intl: props.intl,
    username,
    password,
    setUsername,
    setPassword,
    trouble,
    setTrouble,
    handleLogin,
  }
  let main = <LoginForm  {...formProps} />
  if (trouble) main = <ResetPasswordForm {...formProps} />

  return (
    <React.Fragment>
      <h1><FormattedMessage id={"app." + (trouble ? "troubleLoggingIn" : "logIn")} /></h1>
    { props.location && props.location.state && props.location.state.intent
      ? <Blockquote type="note">
          <FormattedMessage id="app.loginRequiredRedirect" values={{page: props.location.state.intent}}/>
        </Blockquote>
      : null
    }
      <div>{main}</div>
      <a href="#trouble" className="mimic" onClick={() => setTrouble(!trouble)}>
        <FormattedMessage id={"app." + (trouble ? "logIn" : "troubleLoggingIn")} />
      </a>
      <span style={{padding: "0 1rem"}}>|</span>
      <Link to="/signup">
        <FormattedMessage id="app.signUpForAFreeAccount" />
      </Link>
    </React.Fragment>
  );
};

export default injectIntl(Login);
