import React from "react";
import { FormattedMessage } from "react-intl";
import { capitalize } from "@freesewing/utils";
import { Link } from "gatsby"
import PatternOptions from "./pattern-options";
import PatternMeasurements from "./pattern-measurements";

const PatternIndexPage = props => {

  return (
    <React.Fragment>
      <h2>
        <FormattedMessage id={"patterns."+props.pattern+".title"} />
      </h2>
      <p>
        <FormattedMessage id={"patterns."+props.pattern+".description"} />
      </p>
      <h3>
        <FormattedMessage id="app.patternInstructions" />
      </h3>
      <ul className="links">
        <li>
          <Link to={"/docs/patterns/"+props.pattern+"/instructions"}>
            <FormattedMessage id="app.patternInstructions" />
          </Link>
        </li>
      </ul>
      <h3>
        <FormattedMessage id="app.patternOptions" />
      </h3>
      <PatternOptions pattern={props.pattern}/>
      <h3>
        <FormattedMessage id="app.requiredMeasurements" />
      </h3>
      <PatternMeasurements pattern={props.pattern} app={props.app}/>
      <h3>
          <FormattedMessage id="app.examples" />
      </h3>
      <ul className="links">
        <li>
          <Link to={"/showcase/patterns/"+props.pattern}>
            <FormattedMessage id="app.showcase" />
            : {capitalize(props.pattern)}
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default PatternIndexPage;
