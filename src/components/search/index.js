import React, { useState } from 'react'
import { InstantSearch, Hits, connectStateResults, PoweredBy } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import Hit from './hit'
import SearchBox from './search-box'
import './search.scss'

const Results = connectStateResults(({ searchState: state, searchResults: res, children }) =>
  res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

export default function Search({ indices, collapse, hitsAsGrid, search }) {
  // eslint-disable-next-line
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_API_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  const style = {
    display: 'flex',
    flexDirection: 'row',
    placeContent: 'center',
    fontFamily: 'Ubuntu',
    marginTop: '40px',
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.GATSBY_LANGUAGE + '_freesewing_org'}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <SearchBox {...{ collapse, focus }} search={search} />
      <Results>
        <Hits hitComponent={Hit(() => setFocus(false))} />
      </Results>
      <div style={style}>
        <PoweredBy />
      </div>
    </InstantSearch>
  )
}
