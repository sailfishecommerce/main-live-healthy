import Link from 'next/link'
import { Hits } from 'react-instantsearch-dom'

import SearchbarHit from '@/components/Search/SearchbarHit'

interface Props {
  query: string
}

export default function SearchbarHitView({ query }: Props) {
  return (
    <div className="hits absolute top-16  lg:w-1/3 w-full right-0 p-4 bg-white z-50 rounded-md shadow-lg border">
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
  )
}
