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
  ];

  if (props.mobile) {
    links.push({
      to: "/account",
      title: "app.account"
    });
    links.push({
      to: "/logout",
      title: "app.logOut"
    });
  }

  return (
    <ul className="topics">
      {links.map( link => (
        <li className="topic" key={link.title}>
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

