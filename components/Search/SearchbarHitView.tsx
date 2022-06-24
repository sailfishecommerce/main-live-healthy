/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'
import { Configure, connectHits } from 'react-instantsearch-dom'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import SearchbarHit from '@/components/Search/SearchbarHit'
import { algoliaQuerySearchStatus } from '@/lib/atomConfig'

interface Props {
  query: string
  hits: any[]
}

function SearchbarHitViewComponent({ hits, query }: Props) {
  const [searching, setSearching] = useAtom(algoliaQuerySearchStatus)

  useEffect(() => {
    if (hits.length > 0) {
      setSearching(false)
    }
  }, [hits])

  return (
    <div className="hits absolute top-16  lg:w-1/3 w-full right-0 p-4 bg-white z-50 rounded-md shadow-lg border">
      <Configure clickAnalytics hitsPerPage={3} analytics={true} />
      {!searching ? (
        <>
          {hits.map((hit) => (
            <SearchbarHit hit={hit} key={hit.id} />
          ))}
          <Link passHref href={`/search/${query}`}>
            <button
              aria-label="view more"
              className="bg-mountain-green text-white mt-4 p-2 px-3 rounded-md"
              type="button"
            >
              View more
            </button>
          </Link>
        </>
      ) : (
        <SpinnerRipple centerRipple />
      )}
    </div>
  )
}

const SearchbarHitView = connectHits(SearchbarHitViewComponent)
export default SearchbarHitView
