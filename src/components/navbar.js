import React from "react";
import Logo from "./graphics/logo";
import Emblem from "./graphics/emblem";

const NavBar = props => {
  return (
    <header className="navbar">
      <React.Fragment>
        <div className="navbar-logo"><Logo size={36} /></div>
        <a href="https://freesewing.org/" className="navbar-emblem">
          <Emblem size={20} t1="FreeSewing" t2=".dev"/>
        </a>
        <div className="navbar-right">
          <button className="navbar-button">
            text
          </button>
          <button className="navbar-button">
            <Emblem size={16} text1="?" color1="#fff" />
          </button>
        </div>
      </React.Fragment>
    </header>
  )
};

export default NavBar;
