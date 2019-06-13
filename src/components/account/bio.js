import React, { useState } from 'react'
import { FormattedMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Markdown from "react-markdown";

const AccountBio = props => {
  const [bio, setBio] = useState(props.app.account.bio || '');

  const updateBio = evt => setBio(evt.target.value)

  const styles = {
    preview: {
      margin: "1rem 0",
      borderRadius: "6px",
      padding: "1rem 2rem"
    }
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.bioInfo" />
      </Blockquote>
      <TextField
        id="bio"
        multiline={true}
        rows="4"
        rowsMax="12"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: "account.bio" })}
        margin="normal"
        variant="outlined"
        value={bio}
        onChange={updateBio}
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
          onClick={() => props.app.backend.saveAccount(
            {bio: bio},
            props.app.frontend.intl.formatMessage({id: "account.bio"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h6><FormattedMessage id="app.preview" /></h6>
      <div style={styles.preview} className="shadow">
        <Markdown source={bio} />
      </div>
    </React.Fragment>
  );
};

export default AccountBio;
