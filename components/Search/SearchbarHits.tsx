/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from 'react'
import { connectHits } from 'react-instantsearch-dom'

import ViewSearchQuery from '@/components/Algolia/ViewSearchQuery'
import { useAppSelector } from '@/hooks/useRedux'
import { updateSearchData } from '@/redux/algolia-slice'
import { useAppDispatch } from '@/redux/store'
import type { hitType } from '@/typings'

interface SearchHitsProps {
  hits: hitType[]
}

function SearchHits({ hits }: SearchHitsProps) {
  const { viewSearch } = useAppSelector((state) => state.algolia)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (viewSearch) {
      dispatch(updateSearchData(hits))
    }
  }, [viewSearch])

  return <>{hits.length === 0 ? '' : <ViewSearchQuery hits={hits} />}</>
}
const SearchbarHits = memo(connectHits(SearchHits))

export default SearchbarHits
