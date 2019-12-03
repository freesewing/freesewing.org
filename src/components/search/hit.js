import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

const Hit = clickHandler => ({ hit }) => {
  return (
    <div className="search-hit">
      <h2>
        <Link to={hit.path} onClick={clickHandler}>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Link>
      </h2>
      <div className="path">
        <Link to={hit.path} onClick={clickHandler}>
          {hit.path}
        </Link>
      </div>
      <div className="snippet">
        <Snippet attribute="content" hit={hit} tagName="mark" />
      </div>
    </div>
  )
}

export default Hit
