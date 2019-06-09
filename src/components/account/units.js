import React, { useState, useContext } from 'react'
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AccountUnits = props => {
  const app = useContext(AppContext);
  const [units, setUnits] = useState(app.account.settings.units || 'metric');

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
              label={app.frontend.intl.formatMessage({ id: "app." + type + "Units"})}
              key={type}
            />
          );
        })}
      </RadioGroup>
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            {settings: { units: units}},
            app.frontend.intl.formatMessage({id: "account.units"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
};

export default AccountUnits;
