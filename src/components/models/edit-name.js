import React, { useState } from "react";
import Blockquote from "@freesewing/components/Blockquote";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const CreateModel = props => {
  const [name, setName] = useState(props.app.models[props.model].name);

  const updateName = evt => setName(evt.target.value);

  return (
    <React.Fragment>
      <TextField
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: "app.name"})}
        margin="normal"
        variant="outlined"
        value={name}
        type="text"
        onChange={updateName}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              { name.length > 0
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
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          disabled={name.length > 0 ? false : true}
          onClick={() => props.app.backend.saveModel(
            props.model,
            {name: name},
            props.app.frontend.intl.formatMessage({id: "app.name"}),
            "/models/"+props.model
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
}

export default CreateModel;
