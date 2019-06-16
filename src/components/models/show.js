import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
//import SettingsIcon from "@material-ui/icons/Tune";
//import MeasurementsIcon from "@material-ui/icons/Straighten";
//import RemoveIcon from "@material-ui/icons/DeleteForever";
//import ExportIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
//import { Link } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import { measurements as allMeasurements } from "@freesewing/models";
import { formatMm } from "@freesewing/utils";

const ShowModel = ({ app, model }) => {
  const [modal, setModal] = useState(false);

  const styles = {
    table: {
      padding: 0,
      borderCollapse: "collapse",
      width: "100%"
    },
    cell: {
      padding: "1rem",
      borderTop: "1px solid #9993",
      verticalAlign: "top",
    },
    buttonCell: {
      padding: 0,
      borderTop: "1px solid #9993",
      verticalAlign: "middle",
    },
    title: {
      padding: "1rem",
      borderTop: "1px solid #9993",
      verticalAlign: "top",
      textAlign: "right",
      fontWeight: "bold",
    },
    icon: {
      fontSize: "1.5rem"
    },
    addButton: {
      background: "#228be6",
      padding: "6px",
    },
    addIcon: {
      color: "#fff",
      fontSize: "2rem",
    },
    heading: {
      margin: 0,
      padding: "1rem 0",
      textAlign: "right",
    }
  }

  const sortMeasurements = measurements => {
    let sorted = [];
    let translated = {};
    for (let m of measurements) {
      let translation = app.frontend.intl.messages["measurements"+m] || m;
      translated[translation] = m;
    }
    for (let m of Object.keys(translated).sort()) sorted.push(translated[m]);

    return Object.values(translated);
  }

  const measurements = app.models[model].breasts
    ? sortMeasurements(allMeasurements.womenswear)
    : sortMeasurements(allMeasurements.menswear)

  const remainingMeasurements = () => {
    if (typeof app.models[model].measurements === "undefined") return measurements;
    let remaining = [];
    for (let m of measurements) {
      if (
        typeof app.models[model].measurements[m] === "undefined"
        || app.models[model].measurements[m] === null
      )
        remaining.push(m);
    }

    return remaining;
  }

  const measurementRow = (name, value = false) => {
    const missing = {
      opacity: (value ? 1 : 0.5),
      padding: (value ? "1rem" : "0 1rem"),
      verticalAlign: "middle",
    }
    const missingIcon = {
      fontSize: "1.5ren",
      padding: 0,
    }

    return (
      <tr>
        <td style={{...styles.title, ...missing}}>
          <FormattedMessage id={"measurements."+name} />
        </td>
        <td style={{...styles.cell, ...missing}}>
          { value
            ? <span dangerouslySetInnerHTML={{__html: formatMm(value, app.models[model].units)}} />
            : null
          }
        </td>
        <td style={styles.buttonCell}>
          <IconButton
            color="primary"
            style={styles.iconButton}
            size="medium"
            href={"/models/"+model+"/measurements/"+name}
          >
            { value
              ? <EditIcon fontSize="inherit" style={styles.icon}/>
              : <AddIcon fontSize="inherit" style={missingIcon} />
            }
          </IconButton>
        </td>
      </tr>
    );
  }


  return (
    <React.Fragment>
      <table style={styles.table} className="font-title">
        <tbody>
          <tr>
            <td>
              <h5 style={styles.heading}><FormattedMessage id="app.settings" /></h5>
            </td>
            <td colspan="2">&nbsp;</td>
          </tr>
          {/* name */}
          <tr>
            <td style={styles.title}>
              <FormattedMessage id="app.name" />
            </td>
            <td style={styles.cell}>
              {app.models[model].name}
            </td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                href={"/models/"+model+"/name"}
              >
                <EditIcon fontSize="inherit" style={styles.icon}/>
              </IconButton>
            </td>
          </tr>
          {/* chest */}
          <tr>
            <td style={styles.title}>
              <FormattedMessage id="app.chest" />
            </td>
            <td style={styles.cell}>
              <FormattedMessage id={"app.with" + (app.models[model].breasts ? "" : "out") + "Breasts"} />
            </td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                onClick={() => app.backend.saveModel(
                  model,
                  {breasts: (app.models[model].breasts ? "false" : "true")},
                  app.frontend.intl.formatMessage({id: "app.chest"})
                )}
              >
                <EditIcon fontSize="inherit" style={styles.icon}/>
              </IconButton>
            </td>
          </tr>
          {/* units */}
          <tr>
            <td style={styles.title}>
              <FormattedMessage id="account.units" />
            </td>
            <td style={styles.cell}>
              <FormattedMessage id={"app." + app.models[model].units + "Units"} />
            </td>
            <td style={styles.buttonCell}>
              <IconButton
                color="primary"
                style={styles.iconButton}
                size="medium"
                onClick={() => app.backend.saveModel(
                  model,
                  {units: (app.models[model].units === "metric" ? "imperial" : "metric")},
                  app.frontend.intl.formatMessage({id: "account.units"})
                )}
              >
                <EditIcon fontSize="inherit" style={styles.icon}/>
              </IconButton>
            </td>
          </tr>
          <tr><td colspan="3">&nbsp;</td></tr>
          {/* measurements */}
          <tr>
            <td>
              <h5 style={styles.heading}><FormattedMessage id="app.measurements" /></h5>
            </td>
            <td colspan="2">&nbsp;</td>
          </tr>
          { app.models[model].measurements
            ? [
                Object.keys(app.models[model].measurements).map( m => {
                  let value = app.models[model].measurements[m];
                  if (value !== null) return measurementRow(m, value)
                }),
                remainingMeasurements().map( m => measurementRow(m)),
              ]
            : remainingMeasurements().map( m => measurementRow(m))
          }
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default ShowModel;
