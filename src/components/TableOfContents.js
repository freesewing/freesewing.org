import React from "react";

const TableOfContents = props => {
  if (!props.toc.items) return null;
  const items = [];
  for (let i=0; i < props.toc.items.length; i++) {
    let item = props.toc.items[i];
    items.push(<li key={i}><a href={item.url}>{item.title}</a></li>);
  }

  return <ul className="links">{items}</ul>
}

export default TableOfContents;

