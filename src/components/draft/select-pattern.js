import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { list } from "@freesewing/pattern-info";
import Breadcrumbs from "../breadcrumbs";

const SelectPatternPage = props => {
  console.log(list)
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "start",
    },
    pattern: {
      margin: "0.5rem 0.5rem 0",
      width: "calc(25% - 1rem)",
      textAlign: "center",
    },
    name: {
      margin: 0,
      wordWrap: "anywhere",
    }
  }
  if (props.app.frontend.tablet) styles.pattern.width = "calc(33% - 1rem)";
  if (props.app.frontend.mobile) styles.pattern.width = "calc(50% - 1rem)";
  const pageTitle = <FormattedMessage
      id="app.newPattern"
      values={{pattern: props.app.frontend.intl.formatMessage({id: "app.pattern"})}}
    />

  return (
    <React.Fragment>
      <Breadcrumbs crumbs={[]} pageTitle={pageTitle} />
      <h1><FormattedMessage id="app.chooseAPattern" /></h1>
      <div style={styles.wrapper}>
        {
          list.map( pattern => {
            return (
              <div style={styles.pattern}>
                <Link to={"/create/"+pattern} title={pageTitle}>
                <h5 style={styles.name}>
                  {pattern}
                </h5>
                </Link>
              </div>
            )
          })
        }
      </div>
      <Breadcrumbs crumbs={[]} pageTitle={pageTitle} />
    </React.Fragment>
  );
}

export default SelectPatternPage;
