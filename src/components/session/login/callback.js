import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../../breadcrumbs";

const Callback = props => {
  const handleResult = (result, signup) => {
    if (result) {
      if (signup) navigate("/welcome");
      else navigate("/account");
    } else {
      // FIXME: Handle error
      console.log(result, signup);
    }
  }

  useEffect(() => {
    const chunks = props.slug.split("/");
    const validation = chunks.pop();
    const confirmation = chunks.pop();
    props.app.backend.loginOauth({validation, confirmation}, handleResult);

  }, []);
  props.app.frontend.startLoading();
  const crumbs = <Breadcrumbs crumbs={[]} pageTitle={<FormattedMessage id="app.logIn" />} />

  return (
    <React.Fragment>
      {crumbs}
      <h1><FormattedMessage id="app.justAMoment" /></h1>
    </React.Fragment>
  );
};

export default Callback;
