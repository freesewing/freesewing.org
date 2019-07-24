import React from "react";
import NavbarBase from "@freesewing/components/Navbar";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";

const Navbar = props => {
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
      account: props.app.account.username
      ? { type: "link", href: "/account", text: "app.account" }
      : { type: "link", href: "/login", text: "app.logIn" },
      signup: {
        type: "link",
        href: "/signup",
        text: "app.signUp"
      },
      search: {
        type: "link",
        href: "/search",
        text: <SearchIcon className="nav-icon" />,
        title: "app.search"
      },
      language: {
        type: "link",
        href: "/language",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
      theme: {
        type: "button",
        onClick: props.app.frontend.toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    },
  };
  if (props.app.account.username)  delete navs.right.signup;
  else  delete navs.right.logout;

  return <NavbarBase navs={navs} home="/" />
}

export default Navbar;

