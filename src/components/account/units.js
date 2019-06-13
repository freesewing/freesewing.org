import React, { useState } from 'react'
import { FormattedMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AccountUnits = props => {
  const [units, setUnits] = useState(props.app.account.settings.units || 'metric');

  const updateUnits = evt => setUnits(evt.target.value)

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.unitsInfo" />
      </Blockquote>
      <RadioGroup
        name="units"
        onChange={updateUnits}
        value={units}
      >
        {['metric', 'imperial'].map( type => {
          return (
            <FormControlLabel
              control={<Radio color="primary" />}
              value={type}
              checked={type === units ? true : false}
              label={props.app.frontend.intl.formatMessage({ id: "app." + type + "Units"})}
              key={type}
            />
          );
        })}
      </RadioGroup>
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
            {settings: { units: units}},
            props.app.frontend.intl.formatMessage({id: "account.units"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
};

export default AccountUnits;
