import React from "react";
import { FormattedMessage } from "react-intl";
import backend from "../../../../apis/backend";
import authConfig from "../../../../config/auth";
import Button from "@material-ui/core/Button";
import Spinner from "../../../Spinner";
import NiceError from "../../../NiceError";
import GithubIcon from "../../../GithubIcon";

class Github extends React.Component {
  state = {
    loading: false,
    error: false
  };

  login = () => {
    this.setState({ loading: true });
    backend
      .initOauth({
        language: this.props.language,
        provider: "github"
      })
      .then(res => {
        if (res.status === 200)
          window.location = authConfig.github + res.data.state;
        else this.setState({ error: true });
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  render() {
    let login = false;
    if (typeof this.props.login !== "undefined") login = true;
    if (this.state.loading)
      return (
        <div className="txt-center">
          <Spinner />
        </div>
      );
    else if (this.state.error)
      return (
        <NiceError err={new Error("requestFailedWithStatusCode500")} report />
      );
    else
      return (
        <Button
          onClick={this.login}
          color="primary"
          size="large"
          variant="contained"
          fullWidth={true}
        >
          <GithubIcon className="mr1" size={35} />
          {login ? (
            <FormattedMessage id={"app.loginWithGithub"} />
          ) : (
            <FormattedMessage id={"app.signupWithGithub"} />
          )}
        </Button>
      );
  }
}

export default Github;
