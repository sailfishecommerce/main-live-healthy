import algoliasearch from 'algoliasearch'
import type { PropsWithChildren } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { updateQuery } from '@/redux/algolia-slice'
import { useAppDispatch } from '@/redux/store'

export default function AlgoliaInstantSearch({
  children,
}: PropsWithChildren<any>) {
  const dispatch = useAppDispatch()

  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )

  const optimizedSearchClient = {
    ...searchClient,
    search(requests: any) {
      if (requests.every(({ params }: any) => !params.query.length)) {
        dispatch(updateQuery(requests[0].params?.query))

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
      return searchClient.search(requests)
    },
  }

  return (
    <InstantSearch
      indexName="LIVEHEALTHY_PRODUCTION_INDEX"
      searchClient={optimizedSearchClient}
    >
      {children}
    </InstantSearch>
  )
}
