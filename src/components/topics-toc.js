import React from "react";
import TableOfContents from "./TableOfContents";
import ExpandedIcon from "@material-ui/icons/KeyboardArrowDown";
import CollapsedIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "gatsby";

const TopicsToc = props => {

  let items = [];
  let children = false;
  for (let t of props.topics) {
    let liProps = {
      key: t,
      className: "topic",
    }
    let toc = null;
    let tocComponent = <TableOfContents toc={props.toc} slug={props.slug}/>
    if (t === props.topic) {
      liProps.className += " active";
      children = [];
      for (let c in props.topicsToc[t].children) {
        if (c === props.slug) toc = tocComponent
        else toc = null;
        children.push(<li key={c} className={c === props.slug ? "active" : ""}>
          <Link to={c}>
            {props.topicsToc[t].children[c]}
          </Link>
          {toc}
        </li>);
      }
      if (children) children = <ul className="topics l1">{children}</ul>
      else children = null;
    } else children = null;
    if (!children && props.topic === t) children = <TableOfContents toc={props.toc} slug={props.slug}/>
    items.push(<li {...liProps}>
        <Link to={"/"+t} className="topic">
      { t === props.topic
        ? <ExpandedIcon fontSize="inherit"/>
        : <CollapsedIcon fontSize="inherit"/>
      }
          {props.topicsToc[t].title}
        </Link>
      { props.slug.split("/").length === 2
        && props.topic === t
        && props.toc.items
        && props.toc.items.length > 0
        ? <ul className="topics l1"><li>{tocComponent}</li></ul>
        : null
      }
        {children}
      </li>);
  }

  return (
    <ul className="topics">
      {items}
    </ul>
  );
}

export default TopicsToc;
