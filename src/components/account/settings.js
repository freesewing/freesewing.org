import React from "react";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import AvatarIcon from "@material-ui/icons/PhotoCamera";
import BioIcon from "@material-ui/icons/ChatBubbleOutline";
import EmailIcon from "@material-ui/icons/Email";
import Icon from "@freesewing/components/Icon";
import LanguageIcon from "@material-ui/icons/Translate";
import PasswordIcon from "@material-ui/icons/VpnKey";
import UnitsIcon from "@material-ui/icons/Straighten";
import UsernameIcon from "@material-ui/icons/Face";
import ExportIcon from "@material-ui/icons/CloudDownload";
import RestrictIcon from "@material-ui/icons/PauseCircleFilled";
import ConsentIcon from "@material-ui/icons/DoneAll";
import RemoveIcon from "@material-ui/icons/DeleteForever";

const AccountSettings = props => {

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
    iconWrapper: {
      padding: "10px 10px 1rem 10px",
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

  let settings1Tiles = [
    {
      to: "/account/settings/avatar",
      icon: <AvatarIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.avatar",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/account/settings/bio",
      icon: <BioIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.bio",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/account/settings/language",
      icon: <LanguageIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.language",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/account/settings/units",
      icon: <UnitsIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.units",
      style: { backgroundColor: "#7048e8" }
    },
  ];
  let settings2Tiles = [
    {
      to: "/account/settings/github",
      icon: <div style={styles.iconWrapper}><Icon size={80} icon="github" style={styles.icon}/></div>,
      title: "account.github",
      style: { backgroundColor: "#6cc644" }
    },
    {
      to: "/account/settings/instagram",
      icon: <div style={styles.iconWrapper}><Icon size={80} icon="instagram" style={styles.icon}/></div>,
      title: "account.instagram",
      style: { backgroundColor: "#e1306c" }
    },
    {
      to: "/account/settings/twitter",
      icon: <div style={styles.iconWrapper}><Icon size={80} icon="twitter" style={styles.icon}/></div>,
      title: "account.twitter",
      style: { backgroundColor: "#1da1f2" }
    },
    {
      to: "/account/settings/email",
      icon: <EmailIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.email",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/account/settings/username",
      icon: <UsernameIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.username",
      style: { backgroundColor: "#7048e8" }
    },
    {
      to: "/account/settings/password",
      icon: <PasswordIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.password",
      style: { backgroundColor: "#7048e8" }
    },
  ];
  let actionTiles = [
    {
      to: "/account/export",
      icon: <ExportIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.exportYourData",
      style: { backgroundColor: "#1c7ed6" }
    },
    {
      to: "/account/consent",
      icon: <ConsentIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.reviewYourConsent",
      style: { backgroundColor: "#1c7ed6" }
    },
    {
      to: "/account/restrict",
      icon: <RestrictIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.restrictProcessingOfYourData",
      style: { backgroundColor: "#f76707" }
    },
    {
      to: "/account/remove",
      icon: <RemoveIcon fontSize="inherit" style={styles.icon}/>,
      title: "account.removeYourAccount",
      style: { backgroundColor: "#e03131" }
    },
  ];

  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        {settings1Tiles.map( tile => (
          <div style={{...styles.box2, ...tile.style}} className="shadow">
            <Link to={tile.to} style={styles.link}>
              <h4 style={styles.heading}><FormattedMessage id={tile.title} /></h4>
              {tile.icon}
            </Link>
          </div>
        ))}
      </div>
      <div style={styles.wrapper}>
        {settings2Tiles.map( tile => (
          <div style={{...styles.box3, ...tile.style}} className="shadow">
            <Link to={tile.to} style={styles.link}>
              <h4 style={styles.heading}><FormattedMessage id={tile.title} /></h4>
              {tile.icon}
            </Link>
          </div>
        ))}
      </div>
      <div style={styles.wrapper}>
        {actionTiles.map( tile => (
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

export default AccountSettings;
