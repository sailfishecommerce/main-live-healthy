import algoliasearch from 'algoliasearch/lite'
import Link from 'next/link'
import { memo, useState } from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom'

import SearchbarHit from '@/components/Search/SearchbarHit'
import { useMediaQuery } from '@/hooks'

function HomepageComponent() {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const searchbarWidth = mobileWidth ? 'w-full' : 'md:w-32'

  function showSearchResult(e: any) {
    if (e.target.value?.length >= 1) {
      setSearching(true)
      setQuery(e.target.value)
    }
  }

  return (
    <>
      <InstantSearch
        indexName="LIVEHEALTHY_PRODUCTION_INDEX"
        searchClient={searchClient}
      >
        <div
          className={`search relative flex bg-gray-100 xl:w-1/5 ${searchbarWidth} rounded-md py-2 px-1 xl:px-4 items-center`}
        >
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
          <div className="hits absolute top-16 lg:w-1/2 w-full right-0 p-4 bg-white z-50 rounded-md shadow-lg border">
            <Hits hitComponent={SearchbarHit} />
            <Link passHref href={`/search/${query}`}>
              <button
                aria-label="view more"
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

const HomepageSearch = memo(HomepageComponent)
export default HomepageSearch
