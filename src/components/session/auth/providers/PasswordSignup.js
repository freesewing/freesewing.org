import React from "react";
import { connect } from "react-redux";
import backend from "../../../../apis/backend";
import { injectIntl, FormattedMessage } from "react-intl";
import { setUserAccount } from "../../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../../store/actions/notification";
import { validateEmail, validateTld } from "../../../../utils";
import TextField from "@material-ui/core/TextField";
import SignupIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import ButtonSpinner from "../../../ButtonSpinner";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import StarIcon1 from "@material-ui/icons/StarBorder";
import StarIcon2 from "@material-ui/icons/StarHalf";
import StarIcon3 from "@material-ui/icons/Star";
import InputAdornment from "@material-ui/core/InputAdornment";
import Center from "../../../Center";
import SignupSuccessMessage from "../../signup/SuccessMessage";

class Password extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    emailValid: false,
    success: false
  };

  handleSignup = evt => {
    evt.preventDefault();
    this.startLoading();
    if (!validateEmail(this.state.email)) {
      this.props.showNotification(
        "error",
        this.props.intl.formatMessage({
          id: "app.pleaseEnterAValidEmailAddress"
        })
      );
      this.stopLoading();
      return;
    }
    let tld = validateTld(this.state.email);
    if (tld !== true) {
      this.props.showNotification(
        "error",
        this.props.intl.formatMessage(
          { id: "app.invalidTldMessage" },
          { tld: tld }
        ) +
          " — " +
          this.props.intl.formatMessage({
            id: "app.pleaseEnterAValidEmailAddress"
          })
      );
      this.stopLoading();
      return;
    }
    backend
      .signup(this.state.email, this.state.password, this.props.intl.locale)
      .then(res => {
        if (res.status === 200) {
          this.stopLoading();
          this.setState({ success: true });
        }
      })
      .catch(err => {
        this.stopLoading();
        if (err.response.data === "userExists") {
          this.props.showNotification("warning", new Error("emailExists"));
        } else {
          this.props.showNotification("error", err);
        }
      });
  };

  handleEmailUpdate = el => {
    this.setState({
      email: el.target.value,
      emailValid: validateEmail(el.target.value) && validateTld(el.target.value)
    });
  };

  handlePasswordUpdate = el => {
    this.setState({
      password: el.target.value,
      passwordScore: Math.round(el.target.value.length / 6)
    });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    let { intl } = this.props;
    if (this.state.success)
      return (
        <Center>
          <SignupSuccessMessage />
        </Center>
      );

    return (
      <React.Fragment>
        <form onSubmit={this.handleSignup}>
          <FormattedMessage id="app.enterEmailPickPassword" />
          <TextField
            id="email"
            autoFocus={true}
            fullWidth={true}
            autoComplete="email"
            label={intl.formatMessage({ id: "account.email" })}
            helperText={intl.formatMessage({ id: "app.weNeverShareYourEmail" })}
            margin="normal"
            variant="outlined"
            value={this.state.email}
            onChange={this.handleEmailUpdate}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {this.state.emailValid ? (
                    <ValidIcon classes={{ root: "color-success" }} />
                  ) : (
                    <InvalidIcon color="error" />
                  )}
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="password"
            fullWidth={true}
            type="password"
            autoComplete="password"
            label={intl.formatMessage({ id: "account.password" })}
            helperText={intl.formatMessage({ id: "app.noPasswordPolicy" })}
            margin="normal"
            variant="outlined"
            value={this.state.password}
            onChange={this.handlePasswordUpdate}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {this.state.passwordScore === 0 ? (
                    <InvalidIcon color="error" />
                  ) : (
                    ""
                  )}
                  {this.state.passwordScore === 1 ? (
                    <StarIcon1 classes={{ root: "color-success" }} />
                  ) : (
                    ""
                  )}
                  {this.state.passwordScore === 2 ? (
                    <StarIcon2 classes={{ root: "color-success" }} />
                  ) : (
                    ""
                  )}
                  {this.state.passwordScore > 2 ? (
                    <StarIcon3 classes={{ root: "color-success" }} />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              )
            }}
          />
          <div className="txt-center mt05">
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              disabled={this.state.loading || !this.state.emailValid}
            >
              <ButtonSpinner
                loading={this.state.loading}
                icon={<SignupIcon className="btn-icon" />}
              />
              <FormattedMessage id="app.signUp" />
            </Button>
          </div>
        </form>
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
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Password));
