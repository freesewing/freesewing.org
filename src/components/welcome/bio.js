import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import TextField from "@material-ui/core/TextField";
import Markdown from "react-markdown";

const Bio = ({ app, continueButton }) => {
  const [bio, setBio] = useState(app.account.bio || '');

  const updateBio = evt => setBio(evt.target.value)

  const styles = {
    preview: {
      margin: "1rem 0",
      borderRadius: "6px",
      padding: "1rem 2rem"
    }
  }

  return (
    <div>
      <Blockquote type="note">
        <FormattedMessage id="account.bioInfo" />
      </Blockquote>
      <TextField
        id="bio"
        multiline={true}
        rows="4"
        rowsMax="12"
        fullWidth={true}
        label={app.frontend.intl.formatMessage({ id: "account.bio" })}
        margin="normal"
        variant="outlined"
        value={bio}
        onChange={updateBio}
      />
      {continueButton("social", "bio", {bio: bio})}
      <h6><FormattedMessage id="app.preview" /></h6>
      <div style={styles.preview} className="shadow">
        <Markdown source={bio} />
      </div>
    </div>
  );
}

export default Bio;
