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

const Layout = props => {
  const [theme, setTheme] = useState(props.storageData.theme || "light");
  const [menu, setMenu] = useState(false);
  // Methods
  const toggleDarkMode = () => {
    if (theme === "light") {
      setTheme("dark");
      props.updateStorageData("dark", "theme");
    } else {
      setTheme("light");
      props.updateStorageData("light", "theme");
    }
  };
  const toggleMenu = () => {
    setMenu(!menu);
  }
  const closeNav = () => {
    if (menu) setMenu(false);
  }

  // Vars
  const navs = {
    left: {
      docs: {
        type: "link",
        href: "/start",
        text: "app.getStarted"
      },
      tutorial: {
        type: "link",
        href: "/tutorial",
        text: "app.tutorial"
      },
      blog: {
        type: "link",
        href: "/api",
        text: "app.apiReference"
      },
    },
    right: {
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
        onClick: toggleDarkMode,
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
        {props.mobile
          ? (
            <React.Fragment>
              <Fab
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={toggleMenu}>
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
        {React.cloneElement(props.children, { closeNav })}
        { props.mobile ? (
          <div className="menu" onClick={closeNav}>
            {props.menu}
            <p style={styles.menuIcons}>
              <IconButton href="/" color="primary" variant="contained"><HomeIcon /></IconButton>
              <IconButton href="/search" color="primary" variant="contained"><SearchIcon /></IconButton>
              <IconButton href="/languages" color="primary" variant="contained"><LanguageIcon /></IconButton>
              <IconButton onClick={toggleDarkMode} color="primary" variant="contained"><DarkModeIcon style={{transform: "rotate(26deg)"}}/></IconButton>
            </p>
          </div>
        ) : null }
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
    Layout,
    process.env.GATSBY_LANG
  ), "freesewing.dev"
);
