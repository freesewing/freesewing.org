import React, { useState } from "react";
import { FormattedHTMLMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";

const Units = ({ app, continueButton }) => {
  const [username, setUsername] = useState(app.account.username);
  const [usernameValid, setUsernameValid] = useState(true);

  const updateUsername = evt => {
    let value = evt.target.value;
    setUsername(value);
    app.backend.isUsernameAvailable(value, setUsernameValid);
  }

  return (
    <div>
      <Blockquote type="note">
        <p><FormattedHTMLMessage id="account.usernameInfo" /></p>
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
      {continueButton("avatar", "username", {username: username})}
    </div>
  );
}

export default Units;
