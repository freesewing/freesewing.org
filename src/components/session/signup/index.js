import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import successGif from "./success.gif";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import { validateEmail, validateTld } from "@freesewing/utils";
import Blockquote from "@freesewing/components/Blockquote";

const Signup = ({ app, location }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [reveal, setReveal] = useState(null);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);

  const handleSignup = evt => {
    evt.preventDefault();
    app.backend.signup(email, password, process.env.GATSBY_LANGUAGE, handleResult);
  }

  const handleResult = (backendResult, data = false) => {
    if (!backendResult) {
      let msg = "errors.requestFailedWithStatusCode500";
      if (data.data === "userExists") msg = "errors.emailExists";
      setError(<FormattedMessage id={msg} />);
    }
    setResult(backendResult);
  }

  const updateEmail = evt => {
    let value = evt.target.value;
    setEmail(value);
    let valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid);
  }

  const styles = {
    wrapper: {
      maxWidth: "500px",
    }
  }

  const success = (
    <React.Fragment>
    <h1>
      <FormattedMessage id="app.yay" />
      &nbsp;
      <FormattedMessage id="app.goodJob" />
    </h1>
    <p><FormattedMessage id="app.checkInboxClickLinkInConfirmationEmail" /></p>
    <img src={successGif} alt="Yay!" />
    <p><FormattedMessage id="app.goAheadWeWillWait" /></p>
    </React.Fragment>
  );

  const form = (
    <form onSubmit={handleSignup} style={styles.wrapper}>
      <h1><FormattedMessage id="app.signUp" /></h1>
      { (!result && error)
        ? <Blockquote type="warning">{error}</Blockquote>
        : null
      }
      <h6>
        <FormattedMessage id="app.enterEmailPickPassword" />
      </h6>
      <TextField
        id="email"
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.email"})}
        helperText={app.frontend.intl.formatMessage({ id: "app.weNeverShareYourEmail" })}
        margin="normal"
        variant="outlined"
        value={email}
        type="text"
        onChange={updateEmail}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              { emailValid
                ? <ValidIcon style={{ color: "#40c057" }} />
                : <InvalidIcon color="error" />
              }
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="password"
        fullWidth={true}
        type={ reveal ? "text" : "password"}
        autoComplete="password"
        label={app.frontend.intl.formatMessage({ id: "account.password" })}
        helperText={app.frontend.intl.formatMessage({ id: "app.noPasswordPolicy" })}
        margin="normal"
        variant="outlined"
        value={password}
        onChange={evt => setPassword(evt.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span role="img" aria-label="reveal" onClick={() => setReveal(!reveal)} className="poh">
                {reveal
                  ? <span role="img" aria-label="show">👀 </span>
                  : <span role="img" aria-label="show">🙈 </span>
                }
              </span>
            </InputAdornment>
          )
        }}
      />
      <Button
        type="submit"
        color="primary"
        size="large"
        variant="contained"
        style={{margin: "2rem 0"}}
      >
        <FormattedMessage id="app.signUp" />
      </Button>
    </form>
  );

  return result ? success : form;
};

export default Signup;
