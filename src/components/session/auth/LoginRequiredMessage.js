import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../../../utils";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import ButtonSpinner from "../../ButtonSpinner";
import Center from "../../Center";
import Logo from "../../Logo";

const LoginRequiredMessage = ({ location }) => {
  let language = locLang.get(location);
  return (
    <Center>
      <Center>
        <Logo size={200} />
      </Center>
      <h1 className="txt-center mt1">
        <FormattedMessage id="app.youAreNotLoggedIn" />
      </h1>
      <h5 className="mb1 txt-center">
        <FormattedMessage id="app.thisPageRequiresAuthentication" />
      </h5>
      <p className="txt-center">
        <Button
          href={locLang.set("/login", language)}
          color="primary"
          size="large"
          variant="contained"
          className="mr1"
        >
          <ButtonSpinner
            loading={false}
            icon={<LoginIcon className="btn-icon" />}
          />
          <FormattedMessage id="app.logIn" />
        </Button>
        <Button
          classes={{ root: "mt10" }}
          href={locLang.set("/signup", language)}
          color="secondary"
          size="large"
          variant="contained"
        >
          <ButtonSpinner
            loading={false}
            icon={<SignupIcon className="btn-icon" />}
          />
          <FormattedMessage id="app.signUp" />
        </Button>
      </p>
    </Center>
  );
};

LoginRequiredMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default LoginRequiredMessage;
