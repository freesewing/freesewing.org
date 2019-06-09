import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import backend from "../../../../apis/backend";
import authConfig from "../../../../config/auth";
import Button from "@material-ui/core/Button";
import Spinner from "../../../Spinner";
import NiceError from "../../../NiceError";
import GithubIcon from "../../../GithubIcon";
import GoogleIcon from "../../../GoogleIcon";
import { capitalize } from "../../../../utils";

class Oauth extends React.Component {
  state = {
    loading: false,
    error: false
  };

  login = () => {
    this.setState({ loading: true });
    if (typeof this.props.language === "undefined") {
      console.log("langauge is undefined", this.props);
      return false;
    }
    backend
      .initOauth({
        language: this.props.language,
        provider: this.props.provider
      })
      .then(res => {
        if (res.status === 200) {
          window.location = authConfig[this.props.provider] + res.data.state;
        } else this.setState({ error: true });
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  icons = {
    github: <GithubIcon className="mr2" size={36} />,
    google: <GoogleIcon className="mr2" size={36} />
  };

  render() {
    let login = false;
    if (typeof this.props.login !== "undefined") login = true;
    if (this.state.error)
      return (
        <NiceError err={new Error("requestFailedWithStatusCode500")} report />
      );
    else
      return (
        <Button
          onClick={this.login}
          color="primary"
          size="large"
          variant="outlined"
          fullWidth={true}
          className="mb1"
        >
          {this.state.loading ? (
            <Spinner size={36} className="mr2" />
          ) : (
            this.icons[this.props.provider]
          )}
          {login ? (
            <FormattedHTMLMessage
              id={"app.loginWithProvider"}
              values={{ provider: capitalize(this.props.provider) }}
            />
          ) : (
            <FormattedHTMLMessage
              id={"app.signupWithProvider"}
              values={{ provider: capitalize(this.props.provider) }}
            />
          )}
        </Button>
      );
  }
}

export default Oauth;
