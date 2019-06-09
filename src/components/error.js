import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Icon from "@freesewing/components/Icon";
import { camelCase } from "@freesewing/utils";

const Error = props => {

  if (props.report !== undefined)
    return (
      <React.Fragment>
        <p>
          <FormattedMessage id={"errors." + camelCase(props.err.message)} />
        </p>
        <p>
          <Button
            variant="outlined"
            color="primary"
            href="https://github.com/freesewing/website/issues/new"
            target="_BLANK"
          >
            <Icon icon="github" />
            <FormattedMessage id="app.reportThisOnGithub" />
          </Button>
        </p>
      </React.Fragment>
    );
  else
    return <FormattedMessage id={"errors." + camelCase(props.err.message)} />;
};

Error.propTypes = {
  err: PropTypes.object.isRequired
};

export default Error;
