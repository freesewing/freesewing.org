import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormattedMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";

const Units = ({ app, continueButton }) => {
  const [units, setUnits] = useState(app.account.settings.units);

  const handleUnitsChange = evt => {
    setUnits(evt.target.value);
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <p><FormattedMessage id="account.unitsInfo" /></p>
      </Blockquote>
      <RadioGroup name="units" onChange={handleUnitsChange} value={units}>
        <FormControlLabel
          control={<Radio color="primary" />}
          value="metric"
          checked={units === "metric" ? true : false}
          label={app.frontend.intl.formatMessage({ id: "app.metricUnits" })}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          checked={units === "imperial" ? true : false}
          value="imperial"
          label={app.frontend.intl.formatMessage({ id: "app.imperialUnits" })}
        />
      </RadioGroup>
      {continueButton("username", "units", {settings: {units: units}})}
    </React.Fragment>
  );
}

export default Units;
