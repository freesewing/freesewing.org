import React from "react";
import { connect } from "react-redux";
import LoginRequiredMessage from "./LoginRequiredMessage";
import Center from "../../Center";
import Spinner from "../../Spinner";

class AuthContainer extends React.Component {
  render() {
    // Passing location and language props down to children
    const { location, language } = this.props;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { location, language });
    });
    if (this.props.user === null)
      return (
        <Center>
          <Spinner size={200} />
        </Center>
      );
    else if (this.props.user === false)
      return <LoginRequiredMessage location={location} language={language} />;
    else if (this.props.user.status === "active") return children;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AuthContainer);
