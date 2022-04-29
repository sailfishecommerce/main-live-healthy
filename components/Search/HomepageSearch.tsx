/* eslint-disable no-unused-expressions */
import algoliasearch from 'algoliasearch/lite'
import Link from 'next/link'
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
    if (e.target.value?.length >= 1) {
      setSearching(true)
    }
  }

  return (
    <>
      <InstantSearch
        indexName="New_Livehealthy_products_index"
        searchClient={searchClient}
      >
        <div className="search relative flex bg-gray-100 w-1/5 rounded-md py-2 px-4 items-center">
          <Configure hitsPerPage={3} />
          <SearchBox
            showLoadingIndicator
            autoFocus={true}
            className="w-full bg-gray-100"
            searchAsYouType={true}
            onChange={showSearchResult}
            onReset={() => setSearching(false)}
          />
        </div>
        {searching && (
          <div className="hits absolute top-16 w-1/2 right-0 p-4 bg-white z-50 rounded-md shadow-lg border">
            <Hits hitComponent={SearchbarHit} />
            <Link passHref href={`/search/S{}`}>
              <button
                className="bg-mountain-green text-white mt-4 p-2 px-3 rounded-md"
                type="button"
              >
                View more
              </button>
            </Link>
          </div>
        )}
      </InstantSearch>
    </>
  )
}
