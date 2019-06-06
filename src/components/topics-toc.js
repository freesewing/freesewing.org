import React from "react";
import TableOfContents from "./TableOfContents";
import ExpandedIcon from "@material-ui/icons/KeyboardArrowDown";
import CollapsedIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "gatsby";

const TopicsToc = props => {

  const parentSlug = slug => slug.split("/").slice(0, -1).join("/");

  let childIconStyle = {
    marginLeft: "-16px",
    fontSize: "16px"
  }
  let items = [];
  let children = false;
  for (let topic of props.topics) {
    let liProps = {
      key: topic,
      className: "topic",
    }
    let toc = null;
    let tocComponent = <TableOfContents toc={props.toc} slug={props.slug}/>
    if (topic === props.topic) {
      liProps.className += " active";
      children = [];
      for (let childSlug in props.topicsToc[topic].children) {
        let grandchildren = [];
        if (childSlug === props.slug) toc = tocComponent
        if (
          childSlug === props.slug
          || childSlug === parentSlug(props.slug)
        ) {
          for (let grandchildSlug in props.topicsToc[topic].children[childSlug].children) {
            let grandToc = null
            if (grandchildSlug === props.slug) grandToc = tocComponent
            grandchildren.push(<li
              key={grandchildSlug}
              className={grandchildSlug === props.slug ? "active" : ""}
              style={{paddingLeft: "1rem"}}
              >
              <Link
                to={grandchildSlug}
                style={{fontWeight: grandchildSlug === props.slug ? "bold" : "normal"}}
              >
                {props.topicsToc[topic].children[childSlug].children[grandchildSlug].title}
              </Link>
              {grandToc}
            </li>);
          }
        }
        else toc = null;

        let childIcon = null;
        let childClass = '';
        if (grandchildren.length > 0) {
          grandchildren = <ul className="topics">{grandchildren}</ul>
          if (childSlug === props.slug || childSlug === parentSlug(props.slug)) {
            childClass = "active";
            childIcon = <ExpandedIcon fontSize="inherit" style={childIconStyle}/>
          }
        }
        if (
          childClass !== "active" &&
          typeof props.topicsToc[topic].children[childSlug].children !== "undefined" &&
          Object.keys(props.topicsToc[topic].children[childSlug].children).length > 0
        ) childIcon = <CollapsedIcon fontSize="inherit" style={childIconStyle}/>

        children.push(<li key={childSlug} className={childClass}>
          <Link to={childSlug}>
            {childIcon}
            {props.topicsToc[topic].children[childSlug].title}
          </Link>
          {toc}
          {grandchildren}
        </li>);
      }
      if (children) children = <ul className="topics l1">{children}</ul>
      else children = null;
    } else children = null;
    if (!children && props.topic === topic) children = <TableOfContents toc={props.toc} slug={props.slug}/>
    items.push(<li {...liProps}>
        <Link to={"/"+topic} className="topic">
      { topic === props.topic
        ? <ExpandedIcon fontSize="inherit"/>
        : <CollapsedIcon fontSize="inherit"/>
      }
          {props.topicsToc[topic].title}
        </Link>
      { props.slug.split("/").length === 2
        && props.topic === topic
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
