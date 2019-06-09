import React from "react";
import Icon from "@material-ui/icons/KeyboardArrowRight";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";

const UserMenu = props => {
  const links = [
    {
      to: "/pattern",
      title: "app.newPattern"
    },
    {
      to: "/model",
      title: "app.newModel"
    },
    {
      to: "/models",
      title: "app.models"
    },
    {
      to: "/recipes",
      title: "app.recipes"
    },
    {
      to: "/user/"+props.username,
      title: "app.profile"
    },
    {
      to: "/account/settings",
      title: "app.settings"
    },
    {
      to: "/logout",
      title: "app.logOut"
    },
  ];
  return (
    <ul className="topics">
      {links.map( link => (
        <li className="topic">
          <Link className="topic" to={link.to}>
            <Icon fontSize="inherit" />
            <FormattedMessage id={link.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default UserMenu;

