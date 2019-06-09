import React from "react";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import ProfileIcon from "@material-ui/icons/Fingerprint";
import SettingsIcon from "@material-ui/icons/Tune";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ModelsIcon from "@material-ui/icons/PermContactCalendar";
import NewModelIcon from "@material-ui/icons/PersonAdd";
import RecipesIcon from "@material-ui/icons/FolderOpen";
import NewPatternIcon from "@material-ui/icons/NoteAdd";

const AccountMenu = props => {

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    box: {
      textAlign: "center",
      padding: "0",
      borderRadius: "6px",
      marginBottom: "1.5rem",
      color: "#fffd",
    },
    icon: {
      fontSize: "100px",
      display: "block",
      paddingBottom: "1rem",
      margin: "auto",
    },
    heading: {
      margin: 0,
      padding: "1rem 0 0 0",
    },
    link: {
      color: "#fffd",
      textDecoration: "none",
    }
  }
  styles.box2 = {
    ...styles.box,
    width: "calc(50% - 0.5rem)"
  }
  styles.box3 = {
    ...styles.box,
    width: "calc(33.33% - 0.5rem)"
  }

  if (props.mobile) {
    styles.box2.width = "100%";
    styles.box3.width = "100%";
  }

  let addTiles = [
    {
      to: "/pattern",
      icon: <NewPatternIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.newPattern",
      style: { backgroundColor: "#37b24d" }

    },
    {
      to: "/model",
      icon: <NewModelIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.newModel",
      style: { backgroundColor: "#37b24d" }
    },
  ];
  let browseTiles = [
    {
      to: "/models",
      icon: <ModelsIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.models",
      style: { backgroundColor: "#1c7ed6" }
    },
    {
      to: "/recipes",
      icon: <RecipesIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.recipes",
      style: { backgroundColor: "#1c7ed6" }
    },
    {
      to: "/users/"+props.username,
      icon: <ProfileIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.profile",
      style: { backgroundColor: "#1c7ed6" }
    },
  ];
  let otherTiles = [
    {
      to: "/account/settings",
      icon: <SettingsIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.settings",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/logout",
      icon: <LogoutIcon fontSize="inherit" style={styles.icon}/>,
      title: "app.logOut",
      style: { backgroundColor: "#f76707" }
    },
  ];

  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        {addTiles.map( tile => (
          <div style={{...styles.box2, ...tile.style}} className="shadow">
            <Link to={tile.to} style={styles.link}>
              <h4 style={styles.heading}><FormattedMessage id={tile.title} /></h4>
              {tile.icon}
            </Link>
          </div>
        ))}
      </div>
      <div style={styles.wrapper}>
        {browseTiles.map( tile => (
          <div style={{...styles.box3, ...tile.style}} className="shadow">
            <Link to={tile.to} style={styles.link}>
              <h4 style={styles.heading}><FormattedMessage id={tile.title} /></h4>
              {tile.icon}
            </Link>
          </div>
        ))}
      </div>
      <div style={styles.wrapper}>
        {otherTiles.map( tile => (
          <div style={{...styles.box2, ...tile.style}} className="shadow">
            <Link to={tile.to} style={styles.link}>
              <h4 style={styles.heading}><FormattedMessage id={tile.title} /></h4>
              {tile.icon}
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default AccountMenu;
