import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "../breadcrumbs";
import Join from "./join";
import List from "./list";

const PatronsIndex = props => {

  if (props.slug === "/patrons") {
    let theCrumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.ourPatrons" />} />
    return (
      <React.Fragment>
        {theCrumbs}
        <h1><FormattedMessage id="app.ourPatrons" /></h1>
        <List app={props.app} />
        {theCrumbs}
      </React.Fragment>
    );
  }

  const styles = {
    header: {
      minHeight: "300px",
      padding: "3rem 2rem",
      fontFamily: "'Roboto Condensed', sans-serif",
      position: "relative",
      backgroundImage: "url('/flag.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "90% -30%",
    },
    innerHeader: {
      maxWidth: "650px",
      padding: "1rem 2rem",

    },
    h1: {
      margin: "0 0 2rem 0",
      padding: 0,
      fontWeight: 900,
      color: "#fff",
    },
    h2: {
      borderColor: "rgba(255,255,255,0.25)",
      margin: "0 0 1rem 0",
      color: "#fff",
    },
    stripe: {
      backgroundImage: "url('/support.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      minHeight: "300px",
      padding: "3rem 2rem",
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    pitch: {
      color: "white",
      fontSize: "125%"
    },
  }
  let crumbs = [{slug: "/patrons", title: <FormattedMessage id="app.ourPatrons"/>}]
  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id="app.supportFreesewing" />} />
    return (
      <React.Fragment>
        {theCrumbs}
        <div style={styles.stripe}>
          <div style={styles.innerHeader}>
            <h1 style={styles.h1}>Support FreeSewing</h1>
            <h2 style={styles.h2}>
              FreeSewing is fuelled by a voluntary subscription model
            </h2>
            <p style={styles.pitch}>
              If you think what we do is worthwhile, and if you can spare a few coins each month without hardship, you too should become a patron of FreeSewing.
            </p>
            <Button
              style={styles.primaryButton}
              variant="contained"
              href="#tier-2"
            >Pricing</Button>
          </div>
        </div>
        <Join app={props.app}/>
        {theCrumbs}
      </React.Fragment>
    );

}

export default PatronsIndex;
