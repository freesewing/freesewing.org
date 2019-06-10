import React, { useState, useContext } from 'react'
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import AppContext from "../../context/app";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";

const AccountUsername = props => {
  const app = useContext(AppContext);
  const [username, setUsername] = useState(app.account.username || '');
  const [usernameValid, setUsernameValid] = useState(true);

  const updateUsername = evt => {
    let value = evt.target.value;
    setUsername(value);
    app.backend.isUsernameAvailable(value, setUsernameValid);
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedHTMLMessage id={"account.usernameInfo"} />
      </Blockquote>
      <TextField
        id="username"
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.username"})}
        margin="normal"
        variant="outlined"
        value={username}
        type="text"
        onChange={updateUsername}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              { usernameValid
                ? <ValidIcon style={{ color: "#40c057" }} />
                : <InvalidIcon color="error" />
              }
            </InputAdornment>
          )
        }}
      />
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            {username: username},
            app.frontend.intl.formatMessage({id: "account.username"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
};

export default AccountUsername;
