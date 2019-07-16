import Backend from "@freesewing/utils/backend";
import { navigate } from "gatsby";

function useBackend(props) {
  const backend = new Backend(process.env.GATSBY_BACKEND);

  const token = props.storageData.token;

  const saveAccountToStorage = (data, callback) => {
    if (data.account) props.updateStorageData(data.account, "account");
    if (data.models) props.updateStorageData(data.models, "models");
    if (data.recipes) props.updateStorageData(data.recipes, "recipes");
    if (data.token) props.updateStorageData(data.token, "token");
    if (callback) callback();
  }

  const refreshAccount = (callback = false) => {
    backend.account(token)
      .then(res => {
        if (res.status === 200) saveAccountToStorage(res.data, callback);
      })
      .catch(err => {
        return false;
      });
  }

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
          saveAccountToStorage(res.data);
          navigate("/account", {replace: true});
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  const saveAccount = (data, field, to = false) => {
    props.startLoading();
    backend
      .saveAccount(data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: field }
            )
          );
          saveAccountToStorage(res.data);
          navigate((to ? to : "/account/settings"), {replace: true});
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  const saveModel = (handle, data, field, to = false) => {
    props.startLoading();
    backend
      .saveModel(handle, data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading();
          refreshAccount();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: field }
            )
          );
          if (to) navigate(to);
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  const saveRecipe = (handle, data, field, to = false) => {
    props.startLoading();
    backend
      .saveRecipe(handle, data, token)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading();
          refreshAccount();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: field }
            )
          );
          if (to) navigate(to);
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  const isUsernameAvailable = (username, setResult) => {
    backend
      .availableUsername({ username }, token)
      .then(res => {
        if (res.status === 200) setResult(true);
        else setResult(false);
      })
      .catch(err => setResult(false));
  };

  const signup = (email, password, language, setResult) => {
    backend
      .signup(email, password, language)
      .then(res => {
        if (res.status === 200) setResult(true);
        else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  };

  const createAccount = (confirmId, consent, setResult) => {
    props.startLoading();
    backend
      .createAccount(confirmId, consent)
      .then(res => {
        if (res.status === 200) {
          props.showNotification(
            "success",
            props.intl.formatMessage({ id: "app.accountCreated" }) +
            " 🙌  " +
            props.intl.formatMessage({ id: "app.welcomeAboard" }) +
            " 🎉"
          );
          saveAccountToStorage(res.data);
          navigate("/welcome", {replace: true});
        } else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  };

  const createModel = (model, setResult) => {
    props.startLoading();
    backend
      .createModel(model, token)
      .then(res => {
        if (res.status === 200) {
          props.showNotification(
            "success",
            props.intl.formatMessage({ id: "app.created" })
          );
          saveAccountToStorage(res.data);
          navigate("/models/"+res.data.model.handle, {replace: true});
          refreshAccount();
        } else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  };

  const createRecipe = (data, setResult) => {
    props.startLoading();
    backend
      .createRecipe(data, token)
      .then(res => {
        if (res.status === 200) {
          props.showNotification(
            "success",
            props.intl.formatMessage({ id: "app.created" })
          );
          refreshAccount(
            navigate("/recipes/"+res.data.handle, {replace: true})
          );
        } else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  };

  const removeRecipe = handle => {
    props.startLoading();
    backend
      .removeRecipe(handle, token)
      .then(res => {
        if (res.status === 204) {
          props.stopLoading();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "account.success" },
            )
          );
          navigate("/recipes", {replace: true});
          refreshAccount();
        }
      })
      .catch(err => console.log(err));
  };

  const removeModel = handle => {
    props.startLoading();
    backend
      .removeModel(handle, token)
      .then(res => {
        if (res.status === 204) {
          props.stopLoading();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              {id: "app.fieldRemoved"},
              { field: props.intl.formatMessage({id: "app.model"}) }
            )
          );
          navigate("/models", {replace: true});
          refreshAccount();
        }
      })
      .catch(err => console.log(err));
  };

  const exportAccount = () => {
    props.startLoading();
    backend
      .export(token)
      .then(res => {
        props.stopLoading();
        if (res.status === 200) {
          if (typeof window !== "undefined") window.location.href = res.data.export;
        }
      })
      .catch(err => console.log(err));
  };

  const removeAccount = () => {
    props.startLoading();
    backend
      .remove(token)
      .then(res => {
        if (res.status === 200) {
          props.updateStorageData(null, "account");
          props.updateStorageData(null, "models");
          props.updateStorageData(null, "recipes");
          props.updateStorageData(null, "token");
          props.stopLoading();
          props.showNotification(
            "success",
            props.intl.formatMessage(
              { id: "account.accountRemoved" },
            )
          );
          navigate("/", {replace: true});
        }
      })
      .catch(err => console.log(err));
  };

  const logout = username => {
    props.startLoading();
    props.updateStorageData(null, "account");
    props.updateStorageData(null, "models");
    props.updateStorageData(null, "recipes");
    props.updateStorageData(null, "token");
    props.stopLoading();
    props.showNotification(
      "success",
      props.intl.formatMessage(
        { id: "app.seeYouLaterUser" },
        { user: username }
      )
    );
    navigate("/", {replace: true});
  }

  const loadPatrons = setResult => {
    backend
      .loadPatrons()
      .then(res => {
        if (res.status === 200) setResult(true, res.data);
        else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  };

  const loadProfile = (username, setResult) => {
    backend.profile(username, token)
      .then(res => {
        if (res.status === 200) setResult(true, res.data);
        else setResult(false, res);
      })
      .catch((err, foo) => setResult(false, {error: err, data: err.response.data}));
  }

  return {
    createAccount,
    createModel,
    createRecipe,
    exportAccount,
    isUsernameAvailable,
    loadPatrons,
    loadProfile,
    login,
    logout,
    removeModel,
    removeRecipe,
    removeAccount,
    refreshAccount,
    saveAccount,
    saveModel,
    saveRecipe,
    signup,
  }

}

export default useBackend;
