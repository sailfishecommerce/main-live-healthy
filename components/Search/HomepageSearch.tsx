import Link from 'next/link'
import { memo, useState } from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom'
import { useDebounce } from 'use-debounce'

import SearchbarHit from '@/components/Search/SearchbarHit'
import { useMediaQuery } from '@/hooks'
import { algoliaClient } from '@/lib/algoliaConfig'
// import CustomSearchBox from './CustomSearchBox'

const searchClient = {
  ...algoliaClient,
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      // Here we have to do something else
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      })
    }
    return algoliaClient.search(requests)
  },
}

function HomepageComponent() {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedSearchClient] = useDebounce(searchClient, 1000)
  // const [debouncedQuery] = useDebounce(query, 1000)

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
        searchClient={debouncedSearchClient}
      >
        <div
          className={`search relative flex bg-gray-100 xl:w-1/5 ${searchbarWidth} rounded-md py-2 px-1 xl:px-4 items-center`}
        >
          <Configure hitsPerPage={3} />
          {/* <CustomSearchBox /> */}
          {/* </div> */}
          <SearchBox
            showLoadingIndicator
            autoFocus={false}
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
