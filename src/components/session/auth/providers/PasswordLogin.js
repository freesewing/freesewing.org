import React from "react";
import ResetPasswordForm from "../../login/ResetPasswordForm";
import backend from "../../../../apis/backend";
import { injectIntl } from "react-intl";
import { setUserAccount } from "../../../../store/actions/user";
import { setModels } from "../../../../store/actions/models";
import { setDrafts } from "../../../../store/actions/drafts";
import {
  showNotification,
  closeNotification
} from "../../../../store/actions/notification";
import { navigate } from "gatsby";
import { saveToken } from "../../../../utils";
import TextField from "@material-ui/core/TextField";
import LoginIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import ButtonSpinner from "../../../ButtonSpinner";

class LoginContainer extends React.Component {
  state = {
    dialog: false,
    trouble: false,
    username: "",
    password: "",
    loading: false,
    userData: {},
    resetPasswordCheckInbox: false
  };

  handleToggleTrouble = () => {
    this.setState({
      ...this.state,
      trouble: !this.state.trouble,
      resetPasswordCheckInbox: false
    });
  };

  handleLogin = evt => {
    evt.preventDefault();
    this.startLoading();
    backend
      .login(this.state.username, this.state.password)
      .then(res => {
        if (res.status === 200) {
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.goodToSeeYouAgain" },
              { user: "@" + res.data.account.username }
            )
          );
          this.props.setUserAccount(res.data.account);
          this.props.setModels(res.data.models);
          this.props.setDrafts(res.data.drafts);
          saveToken(res.data.token);
          this.stopLoading();
          navigate("/" + this.props.intl.locale);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
  };

  handlePasswordReset = evt => {
    evt.preventDefault();
    this.startLoading();
    backend
      .resetPassword(evt.target.elements["username"].value)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            resetPasswordCheckInbox: true
          });
          this.stopLoading();
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
  };

  handleUsernameUpdate = el => {
    this.setState({
      ...this.state,
      username: el.target.value
    });
  };

  handlePasswordUpdate = el => {
    this.setState({
      ...this.state,
      password: el.target.value
    });
  };

  startLoading = () => {
    this.setState({
      ...this.state,
      loading: true
    });
  };

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  render() {
    let { intl } = this.props;
    if (this.state.trouble)
      return (
        <ResetPasswordForm
          intl={this.props.intl}
          loading={this.state.loading}
          language={this.props.language}
          handlePasswordReset={this.handlePasswordReset}
          handleToggleTrouble={this.handleToggleTrouble}
          checkInbox={this.state.resetPasswordCheckInbox}
        />
      );
    else
      return (
        <React.Fragment>
          <form onSubmit={this.handleLogin}>
            <TextField
              id="username"
              autoFocus={true}
              fullWidth={true}
              autoComplete="username"
              label={intl.formatMessage({ id: "account.username" })}
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleUsernameUpdate}
            />
            <TextField
              id="password"
              fullWidth={true}
              type="password"
              autoComplete="password"
              label={intl.formatMessage({ id: "account.password" })}
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handlePasswordUpdate}
            />
            <div className="txt-center mt05">
              <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={this.state.loading}
                classes={{ root: "mt10" }}
              >
                <ButtonSpinner
                  loading={this.state.loading}
                  icon={<LoginIcon className="btn-icon" />}
                />
                <FormattedMessage id="app.logIn" />
              </Button>
            </div>
          </form>
          <div className="txt-center t05">
            <a
              href="#trouble"
              className="mimic"
              onClick={this.handleToggleTrouble}
            >
              <FormattedMessage id="app.troubleLoggingIn" />
            </a>
          </div>
        </React.Fragment>
      );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account)),
  setModels: models => dispatch(setModels(models)),
  setDrafts: drafts => dispatch(setDrafts(drafts)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginContainer));
