import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Markdown from "react-markdown";
import Blockquote from "@freesewing/components/Blockquote";

const EditNotes = props => {
  const [notes, setNotes] = useState(props.app.models[props.model].notes || '');

  const updateNotes = evt => setNotes(evt.target.value);

  const styles = {
    preview: {
      margin: "1rem 0",
      borderRadius: "6px",
      padding: "1rem 2rem"
    }
  }


  return (
    <React.Fragment>
    <TextField
        multiline={true}
        rows="8"
        rowsMax="16"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: "app.notes" })}
        margin="normal"
        variant="outlined"
        value={notes}
        onChange={updateNotes}
      />
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href={"/models/"+props.model}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          onClick={() => props.app.backend.saveModel(
            props.model,
            {notes: notes},
            props.app.frontend.intl.formatMessage({id: "app.notes"}),
            "/models/"+props.model
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h6><FormattedMessage id="app.preview" /></h6>
      <div style={styles.preview} className="shadow">
        <Markdown source={notes} />
      </div>
      <Blockquote type="note">
        <FormattedMessage id="app.thisFieldSupportsMarkdown" />
      </Blockquote>
    </React.Fragment>
  );
}

export default EditNotes;
