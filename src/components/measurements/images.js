import React, {useState} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import breastsImages from "./breasts/";
import nobreastsImages from "./nobreasts/";
import MeasurementImage from "./image";
import { injectIntl } from "react-intl";

const MeasurementImages = props => {
  const [tab, setTab] = useState(0);

  const toggleTab = () => setTab(tab === 0 ? 1 : 0);

  const seated = [
    "seatdepth"
  ];

  const breastsOnly = [
    "bustspan",
    "highbust",
    "highpointshouldertobust",
    "naturalwaisttounderbust",
    "underbust"
  ];

  const bg = "/model-"
    + ((tab === 0) ? '' : 'no')
    + "breasts-"
    + ((seated.indexOf(props.measurement.toLowerCase()) !== -1) ? "seated" : "standing")
    + ".jpg";
  const img = tab === 0
    ? breastsImages[props.measurement.toLowerCase()]
    : nobreastsImages[props.measurement.toLowerCase()]

  if (breastsOnly.indexOf(props.measurement.toLowerCase()) !== -1)
    return (
      <MeasurementImage
        measurement={props.measurement}
        breasts={true}
        intl={props.intl}
        bg={bg}
        img={img}
      />
    );
  else
    return (
      <div>
        <Tabs
          value={tab}
          onChange={toggleTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={props.intl.formatMessage({ id: "app.withBreasts" })}
          />
          <Tab
            label={props.intl.formatMessage({
              id: "app.withoutBreasts"
            })}
          />
        </Tabs>
        <MeasurementImage
          measurement={props.measurement}
          breasts={tab === 0 ? true : false}
          intl={props.intl}
          bg={bg}
          img={img}
        />
      </div>
    );
}

export default injectIntl(MeasurementImages);
