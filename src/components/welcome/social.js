import React, { useState } from "react";
import { FormattedHTMLMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const Social = ({ app, continueButton }) => {
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  const updateGithub = evt => setGithub(evt.target.value);
  const updateTwitter = evt => setTwitter(evt.target.value);
  const updateInstagram = evt => setInstagram(evt.target.value);

  return (
    <div>
      <Blockquote type="note">
        <p><FormattedHTMLMessage id="account.socialInfo" /></p>
      </Blockquote>
      <h5>Github</h5>
      <TextField
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.github" })}
        margin="normal"
        variant="outlined"
        value={github}
        type="text"
        onChange={updateGithub}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              @
            </InputAdornment>
          )
        }}
      />
      <h5>Twitter</h5>
      <TextField
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.twitter" })}
        margin="normal"
        variant="outlined"
        value={twitter}
        type="text"
        onChange={updateTwitter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              @
            </InputAdornment>
          )
        }}
      />
      <h5>Instagram</h5>
      <TextField
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.instagram" })}
        margin="normal"
        variant="outlined"
        value={instagram}
        type="text"
        onChange={updateInstagram}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              @
            </InputAdornment>
          )
        }}
      />
      {continueButton("ready", "social", {social: {github, instagram, twitter}})}
    </div>
  );
}

export default Social;
