import { useContext } from "react";
import AppContext from "../context/app";
import { navigate } from "gatsby";

const LoginRequired = props => {
  const app = useContext(AppContext);

  const loggedIn = () => {
    try {
      if (app.account.status === "active") return true;
    }
    catch(err) {
      return false;
    }
  }

  if (loggedIn()) return props.children
  if (typeof window !== "undefined") {
    // Only try this in the browser
    navigate("/login", {
      state: {
        intent: props.page
      }
    });
  }

  return null;
}

export default LoginRequired;
