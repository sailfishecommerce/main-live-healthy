/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { connectSearchBox } from 'react-instantsearch-dom'
import { useDebouncedCallback } from 'use-debounce'

import SearchbarHitView from '@/components/Search/SearchbarHitView'
import { useMediaQuery } from '@/hooks'
import { algoliaQuerySearchStatus } from '@/lib/atomConfig'

function SearchBox({ currentRefinement, refine }: any) {
  const [searching, setSearching] = useAtom(algoliaQuerySearchStatus)
  const [query, setQuery] = useState(currentRefinement)
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const searchbarWidth = mobileWidth ? 'w-full' : ''

  const debounced = useDebouncedCallback((queryValue) => {
    refine(queryValue)
    setQuery(queryValue)
  }, 1100)

  function onChangeDebounced(e: any) {
    debounced(e.target.value)
    setSearching(true)
  }

  useEffect(() => {
    if (query.length === 0 && searching) {
      setSearching(false)
    }
  }, [query])

  function resetHandler() {
    refine('')
    setQuery('')
    setSearching(false)
  }

  return (
    <>
      <div
        className={`ml-4 search relative flex bg-gray-100 ${searchbarWidth} rounded-md py-2 px-1 xl:px-4 items-center`}
      >
        <div className="ais-SearchBox">
          <form role="search" className="ais-SearchBox-form">
            <input
              type="text"
              defaultValue={query}
              placeholder="search products..."
              className="bg-gray-100 px-2"
              onChange={onChangeDebounced}
            />
            {query.length > 0 && (
              <button type="button" onClick={resetHandler}>
                <FaTimes />
              </button>
            )}
          </form>
        </div>
      </div>
      {query.length > 0 && <SearchbarHitView query={query} />}
      <style jsx>
        {`
          .search form.ais-SearchBox-form input {
            width: 140px;
          }
          @media (max-width: 768px) {
            .search form.ais-SearchBox-form input,
            .ais-SearchBox {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

const CustomSearchBox: any = connectSearchBox(SearchBox)

export default CustomSearchBox
