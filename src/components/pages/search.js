import React, { useEffect } from 'react'
import Search from "../search";

const SearchPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'app.search'}))
  }, [])

  return (
    <React.Fragment>
     <Search search={props.app.frontend.intl.formatMessage({id:"app.search"})} />
    </React.Fragment>
  )
}

export default SearchPage
