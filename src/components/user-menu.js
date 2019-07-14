import React from "react";
import CollapsedIcon from "@material-ui/icons/KeyboardArrowRight";
import ExpandedIcon from "@material-ui/icons/KeyboardArrowDown";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { list } from "@freesewing/pattern-info";

const UserMenu = props => {
  const links = [
    {
      to: "/draft",
      title: [
        <FormattedMessage
          id="app.draftPattern"
          values={{pattern: props.intl.formatMessage({id: "app.pattern"})}}
        />,
        <span>&nbsp;</span>,
      ]
    },
  ];
  if (props.slug.slice(0,6) !== "/draft") links[0].title.push('✨');

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

  const chunks = props.slug.split("/");

  return (
    <ul className="topics">
      {links.map( link => {
        let active = false;
        if ("/"+chunks[1] === link.to) active = true;
        return (
        <li
          className={active ? "topic active" : "topic"}
        key={link.title}>
          <Link className="topic" to={link.to}>
            { active
              ? <ExpandedIcon fontSize="inherit" />
              : <CollapsedIcon fontSize="inherit" />
            }
            { typeof link.title === "string"
              ? <FormattedMessage id={link.title} />
              : link.title
            }
          </Link>
        { (link.to === "/draft" && active)
          ? (
            <ul className="topic-links level-1">
              {list.map( pattern => {
                return (
                  <li>
                    <Link to={"/draft/"+pattern} className={chunks[2] === pattern ? "active" : ""}>
                      <CollapsedIcon fontSize="inherit" />
                      <FormattedMessage id="app.draftPattern" values={{pattern}} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null
        }
        </li>
      )
      })}
    </ul>
  );
}

export default UserMenu;

