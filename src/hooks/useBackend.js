import { backend as Backend } from "@freesewing/utils";
import { navigate } from "gatsby";

function useBackend(props) {
  const backend = new Backend(process.env.GATSBY_BACKEND);

  const login = (username, password) => {
    props.startLoading();
    backend
      .login(username, password)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "app.goodToSeeYouAgain" },
              { user: "@" + res.data.account.username }
            )
          );
          props.updateStorageData(res.data.account, "account");
          props.updateStorageData(res.data.models, "models");
          props.updateStorageData(res.data.recipes, "recipes");
          props.updateStorageData(res.data.token, "token");

          navigate("/account", {replace: true});
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  return {
    login,
  }

}

export default useBackend;
