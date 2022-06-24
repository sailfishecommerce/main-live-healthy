import { memo } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import { useDebounce } from 'use-debounce'

import CustomSearchBox from '@/components/Search/CustomSearchBox'
import { algoliaClient } from '@/lib/algoliaConfig'

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
  const [debouncedSearchClient] = useDebounce(searchClient, 1000)

  return (
    <>
      <InstantSearch
        indexName="LIVEHEALTHY_PRODUCTION_INDEX"
        searchClient={debouncedSearchClient}
      >
        <CustomSearchBox />
      </InstantSearch>
    </>
  )
}

const HomepageSearch = memo(HomepageComponent)
export default HomepageSearch
