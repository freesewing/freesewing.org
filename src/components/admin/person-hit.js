import React from 'react'

const SearchHit = (props) => <pre>{JSON.stringify(props.person, null, 2)}</pre>

export default SearchHit
