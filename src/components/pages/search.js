import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Search from "../search";

const SearchPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.search" />)
  }, [])

  return (
    <React.Fragment>
     <Search search={props.app.frontend.intl.formatMessage({id:"app.search"})} />
    </React.Fragment>
  )
}

export default SearchPage
