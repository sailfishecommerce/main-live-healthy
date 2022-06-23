/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Hits, connectSearchBox } from 'react-instantsearch-dom'
import { useDebounce } from 'use-debounce'

import SearchbarHit from '@/components/Search/SearchbarHit'

function SearchBox({ currentRefinement, isSearchStalled, refine }: any) {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 1000)

  console.log('searching', searching)
  console.log('query', query)
  console.log('debouncedQuery', debouncedQuery)
  console.log('currentRefinement', currentRefinement)

  function showSearchResult(e: any) {
    if (e.target.value?.length >= 1) {
      setSearching(true)
      setQuery(e.target.value)
    }
  }

  function resetHandler() {
    refine('')
    setSearching(false)
  }

  useEffect(() => {
    refine(debouncedQuery)
  }, [])

  return (
    <>
      <input
        type="text"
        value={''}
        placeholder="search products"
        className="px-4"
        onChange={showSearchResult}
      />
      <button type="button" onClick={resetHandler}>
        Reset query
      </button>
      {isSearchStalled ? 'My search is stalled' : ''}
      {false && (
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
    </>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox
