import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

const Hit = clickHandler => ({ hit }) => {
  return (
    <React.Fragment>
      <h6>
        <Link to={hit.path} onClick={clickHandler}>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Link>
      </h6>
      <p style={{marginTop: 0}}>
        <Snippet attribute="content" hit={hit} tagName="mark" />
      </p>
    </React.Fragment>
  )
}

export default Hit
