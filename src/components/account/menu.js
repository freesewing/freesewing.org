import React from "react";
import { FormattedMessage } from "react-intl";
import ProfileIcon from "@material-ui/icons/Fingerprint";
import SettingsIcon from "@material-ui/icons/Tune";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ModelsIcon from "@material-ui/icons/PermContactCalendar";
import NewModelIcon from "@material-ui/icons/PersonAdd";
import RecipesIcon from "@material-ui/icons/FolderOpen";
import NewPatternIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";

const AccountMenu = props => {

  const styles = {
    wrapper: {
      maxWidth: "400px",
      margin: "0 auto 40px",
    },
    icon: {
      marginRight: "0.5rem",
    },
    button: {
      margin: "0 1rem 1rem 0",
    }
  }
  const tiles = {
    primary: [
      {
        to: "/create",
        icon: <NewPatternIcon style={styles.icon}/>,
        title: <FormattedMessage
          id="app.create"
          values={{pattern: props.intl.formatMessage({ id: "app.pattern" })}} />
      },
      {
        to: "/model",
        icon: <NewModelIcon style={styles.icon}/>,
        title: "app.newModel",
      },
    ],
    info: [
      {
        to: "/models",
        icon: <ModelsIcon style={styles.icon}/>,
        title: "app.models",
        className: "info"
      },
      {
        to: "/recipes",
        icon: <RecipesIcon style={styles.icon}/>,
        title: "app.recipes",
        className: "info"
      },
    ],
    accent: [
      {
        to: "/users/"+props.username,
        icon: <ProfileIcon style={styles.icon}/>,
        title: "app.profile",
      },
      {
        to: "/account/settings",
        icon: <SettingsIcon style={styles.icon}/>,
        title: "app.settings",
      },
    ],
    danger: [
      {
        to: "/logout",
        icon: <LogoutIcon style={styles.icon}/>,
        title: "app.logOut",
      },
    ]
  };

  return (
    <React.Fragment>
      {Object.keys(tiles).map( type => {
        let btns = [];
        for (let tile of tiles[type]) btns.push(
          <Button
            key={tile.to}
            color="primary"
            fullWidth
            style={styles.button}
            variant="contained"
            className={type}
            href={tile.to}
            size="large"
          >
              {tile.icon}
          { typeof tile.title === "string"
              ? <FormattedMessage id={tile.title} />
              : tile.title
          }
          </Button>
        );

        return <div style={styles.wrapper}>{btns}</div>
        })
      }
    </React.Fragment>
  );
};

export default AccountMenu;
