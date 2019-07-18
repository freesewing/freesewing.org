import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
//import { Link } from "gatsby";
import { list } from "@freesewing/pattern-info";
import Breadcrumbs from "../breadcrumbs";

const RecreatePage = props => {
  const handleResult = (result, data) => {
    if (result) {
      setRecipe(data);
    } else {
      // FIXME: Handle error
    }
  }
  const [recipe, setRecipe] = useState(false);
  useEffect(() => {
    props.app.backend.loadRecipe(props.slug.split("/").pop(), handleResult);
  }, []);

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
  const pageTitle = <FormattedMessage
      id="app.draftPattern"
      values={{pattern: props.app.frontend.intl.formatMessage({id: "app.pattern"})}}
    />

  return (
    <React.Fragment>
      <Breadcrumbs crumbs={[]} pageTitle={pageTitle} />
      <h1><FormattedMessage id="app.recreate" /></h1>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
      <div style={styles.wrapper}>
      </div>
      <Breadcrumbs crumbs={[]} pageTitle={pageTitle} />
    </React.Fragment>
  );
}

export default RecreatePage;
