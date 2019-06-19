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
        '✨',
      ]
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

  let children = [];
  let active = '';
  console.log(props.slug, props.slug.slice(0,6));
  if (props.slug.slice(0,6) === "/draft") {
    children = list;
    active = 'active';
  }

  return (
    <ul className="topics">
      {links.map( link => (
        <li className={"topic "+active} key={link.title}>
          <Link className="topic" to={link.to}>
            { active === "active"
              ? <ExpandedIcon fontSize="inherit" />
              : <CollapsedIcon fontSize="inherit" />
            }
            { typeof link.title === "string"
              ? <FormattedMessage id={link.title} />
              : link.title
            }
          </Link>
        { children.length > 0
          ? (
            <ul className="topics l1">
              {children.map( pattern => {
                return (
                  <li>
                    <Link to={"/draft/"+pattern}>
                      <FormattedMessage id="app.draftPattern" values={{pattern}} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null
        }
        </li>
      ))}
    </ul>
  );
}

export default UserMenu;

