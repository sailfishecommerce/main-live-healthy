import algoliasearch from 'algoliasearch'
import { useState } from 'react'

// import { addProductSearch } from '@/hooks/useVbout'

export default function useAlgoliaClient() {
  const [querylength, setQueryLength] = useState(null)

  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )

  const algoliasearchClient = {
    ...searchClient,
    search(requests: any) {
      if (requests.every(({ params }: any) => !params.query)) {
        const reqlength = requests[0].params?.query.length
        setQueryLength(reqlength)
        // if (reqlength > 0) {
        //   addProductSearch(searchContent)
        // }

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

  return {
    querylength,
    algoliasearchClient,
  }
}
