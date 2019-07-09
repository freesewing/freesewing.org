import React from "react";
import { FormattedMessage } from "react-intl";
import { capitalize } from "@freesewing/utils";
import { Link } from "gatsby"
import { versions, measurements, optionGroups } from "@freesewing/pattern-info";

const PatternIndexPage = props => {
  const sortMeasurements = measurements => {
    let sorted = [];
    let translated = {};
    for (let m of measurements) {
      let translation = props.app.frontend.intl.messages["measurements"+m] || m;
      translated[translation] = m;
    }
    let order = Object.keys(translated);
    order.sort();
    for (let m of order) sorted.push(translated[m]);

    return Object.values(sorted);
  }

  const renderOptions = () => {
    const groups = optionGroups[props.pattern];
    const list = [];
    for (let l1 in groups) {
      let children = [];
      for (let l2 of groups[l1]) {
        if(typeof l2 === "string") {
          children.push(
            <li>
              <Link to={"/docs/patterns/"+props.pattern+"/options/"+l2.toLowerCase()}>
                <FormattedMessage id={"options."+props.pattern+"."+l2+".title"}/>
              </Link>
            </li>
          );
        } else {
          let grandchildren = [];
          for (let l3 of l2) {
            grandchildren.push(
              <li>
                <FormattedMessage id={"options."+props.pattern+"."+l2+".title"}/>
                <Link to={"/docs/patterns/"+props.pattern+"/options/"+l3.toLowerCase()}>
                  <FormattedMessage id={"options."+props.pattern+"."+l3+".title"}/>
                </Link>
              </li>
            );
            children.push(
              <li><FormattedMessage id={"optiongroups."+l2}/>
                <ul className="links">{grandchildren}</ul>
              </li>
            );
          }
        }
      }
      list.push(
        <li><FormattedMessage id={"optiongroups."+l1}/>
          <ul className="links">{children}</ul>
        </li>
      );
    }

    return [
      <pre>{JSON.stringify(groups, null, 2)}</pre>,
      <ul className="links">{list}</ul>
    ];
  }

  return (
    <React.Fragment>
      <h2>
        <FormattedMessage id={"patterns."+props.pattern+".title"} />
      </h2>
      <p>
        <FormattedMessage id={"patterns."+props.pattern+".description"} />
      </p>
      <h3>
        <FormattedMessage id="app.docs" />
      </h3>
      <ul className="links">
        <li>
          <Link to={"/docs/patterns/"+props.pattern+"/instructions"}>
            <FormattedMessage id="app.patternInstructions" />
          </Link>
        </li>
        <li>
          <Link to={"/docs/patterns/"+props.pattern+"/options"}>
            <FormattedMessage id="app.patternOptions" />
          </Link>
          {renderOptions()}
        </li>
        <li>
          <FormattedMessage id="app.requiredMeasurements" />:
          <ul className="links">
            {sortMeasurements(measurements[props.pattern]).map( m => <li key={m}>
                <Link to={"/docs/measurements/"+m.toLowerCase()}>
                  <FormattedMessage id={"measurements."+m}/>
                </Link>
              </li>)}
          </ul>
        </li>
      </ul>
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
