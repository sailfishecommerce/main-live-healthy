import algoliasearch from 'algoliasearch/lite'
import { useState } from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom'

import SearchbarHit from '@/components/Search/SearchbarHit'

export default function HomepageSearch() {
  const [searching, setSearching] = useState(false)

  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )

  function showSearchResult(e: any) {
    if (e.currentTarget.value?.length <= 1) {
      setSearching(true)
    }
    const newLocal = () =>
      e.currentTarget.value?.length === 0 && setSearching(false)
    newLocal()
  }

  return (
    <>
      <InstantSearch
        indexName="New_Livehealthy_products_index"
        searchClient={searchClient}
      >
        <div className="search relative flex bg-gray-100 w-1/5 rounded-md py-2 px-4 items-center">
          <Configure hitsPerPage={4} />
          <SearchBox
            showLoadingIndicator
            autoFocus={false}
            onChange={showSearchResult}
            className="w-full"
          />
        </div>
        {searching && (
          <div className="hits absolute top-16 w-1/2 right-0 p-4 bg-white z-50 rounded-md shadow-lg border">
            <Hits hitComponent={SearchbarHit} />
          </div>
        )}
      </InstantSearch>
    </>
  )
}
