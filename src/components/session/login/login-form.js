import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";

const LoginForm = props => {

  const styles = {
    wrapper: {
      maxWidth: "500px",
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={props.handleLogin} style={styles.wrapper}>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label={props.intl.formatMessage({ id: "account.username" })}
          margin="normal"
          variant="outlined"
          value={props.username}
          onChange={evt => props.setUsername(evt.target.value)}
        />
        <TextField
          id="password"
          fullWidth={true}
          type="password"
          autoComplete="password"
          label={props.intl.formatMessage({ id: "account.password" })}
          margin="normal"
          variant="outlined"
          value={props.password}
          onChange={evt => props.setPassword(evt.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          disabled={props.loading}
          style={{margin: "2rem 0"}}
        >
          <FormattedMessage id="app.logIn" />
        </Button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
