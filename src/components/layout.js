import React, { useState } from "react";
import PropTypes from "prop-types";
//import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import withLanguage from "./withLanguage";
import withStorage from "@freesewing/components/withStorage";
import Navbar from "@freesewing/components/Navbar";
import Footer from "@freesewing/components/Footer";
import * as themes from "@freesewing/mui-theme";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "@freesewing/css-theme";
import "typeface-roboto-condensed";
import "typeface-permanent-marker";
import Fab from '@material-ui/core/Fab';
import AppContext from "../context/app";
import useBackend from "../hooks/useBackend";
import { injectIntl } from "react-intl";
import Notification from "./notification";
import Loading from "./loading";
import UserMenu from "./user-menu";

const Layout = props => {
  const [theme, setTheme] = useState(props.storageData.theme || "light");
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const backend = useBackend({
    intl: props.intl,
    showNotification: (type, message) => {
      setNotification({type, message});
      setNotificationVisible(true);
    },
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
    updateStorageData: props.updateStorageData
  });
  const frontend = {
    showNotification: (type, message) => {
      setNotification({type, message});
      setNotificationVisible(true);
    },
    notification,
    notificationVisible,
    setNotificationVisible,
    toggleDarkMode: () => {
      if (theme === "light") {
        setTheme("dark");
        props.updateStorageData("dark", "theme");
      } else {
        setTheme("light");
        props.updateStorageData("light", "theme");
      }
    },
    toggleMenu: () => setMenu(!menu),
    closeNav: () => {
      if (menu) setMenu(false)
    },
    mobile: props.mobile
  }
  const app = {
    account: props.storageData.account || {},
    models: props.storageData.models || {},
    recipes: props.storageData.recipes || {},
    backend,
    frontend,
  };

  // Vars
  const navs = {
    left: {
      patterns: {
        type: "link",
        href: "/patterns",
        text: "app.patterns"
      },
      docs: {
        type: "link",
        href: "/docs",
        text: "app.docs"
      },
      blog: {
        type: "link",
        href: "/blog",
        text: "app.blog"
      },
    },
    right: {
      account: app.account.username
      ? { type: "link", href: "/account", text: "app.account" }
      : { type: "link", href: "/login", text: "app.logIn" },
      search: {
        type: "link",
        href: "/search",
        text: <SearchIcon className="nav-icon" />,
        title: "app.search"
      },
      language: {
        type: "link",
        href: "/languages",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
      theme: {
        type: "button",
        onClick: app.frontend.toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    },
  };

  const styles = {
    menuIcons: {
      margin: "2rem 0 100px 0",
      textAlign: "center",
    }
  }
  // Render
  let wrapperClasses = theme === "light"
    ? "theme-wrapper light"
    : "theme-wrapper dark";
  if (menu) wrapperClasses += " show-menu";

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div className={wrapperClasses}>
        <AppContext.Provider value={app}>
          {props.mobile
            ? (
              <React.Fragment>
                <Fab
                  color="primary"
                  className="fab primary only-xs"
                  aria-label="Menu"
                  onClick={app.frontend.toggleMenu}>
                  { menu
                    ? <CloseIcon fontSize="inherit" />
                    : <MenuIcon fontSize="inherit" />
                  }
                </Fab>
                <Navbar navs={navs} home="/" />
              </React.Fragment>
            )
            : <Navbar navs={navs} home="/" />
          }
          {props.children}
          <Notification
            notification={notification}
            notificationVisible={notificationVisible}
            closeNotification={() => setNotificationVisible(false)}
          />
          <Loading loading={loading} />
          { props.mobile ? (
            <div className="menu" onClick={app.frontend.closeNav}>
              {props.menu}
              { app.account.username ? <UserMenu /> : null }
              <p style={styles.menuIcons}>
                <IconButton href="/" color="primary" variant="contained"><HomeIcon /></IconButton>
                <IconButton href="/search" color="primary" variant="contained"><SearchIcon /></IconButton>
                <IconButton href="/languages" color="primary" variant="contained"><LanguageIcon /></IconButton>
                <IconButton onClick={app.frontend.toggleDarkMode} color="primary" variant="contained"><DarkModeIcon style={{transform: "rotate(26deg)"}}/></IconButton>
              </p>
            </div>
          ) : null }
        </AppContext.Provider>
        <Footer language={props.language}/>
      </div>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  navbar: PropTypes.bool,
  footer: PropTypes.bool,
}

Layout.defaultProps = {
  navbar: true,
  footer: true,
}

export default withStorage(
  withLanguage(
    injectIntl(Layout),
    process.env.GATSBY_LANG
  ), "freesewing.dev"
);
