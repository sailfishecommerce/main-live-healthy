import type { SearchClient } from 'algoliasearch/lite'
import algoliasearch from 'algoliasearch/lite'
import { useMemo } from 'react'

import { querySuggestionsIndexName } from '@/utils/env'

export type SearchClientHookOptions = {
  appId: string
  searchApiKey: string
}

export function getSearchClient(
  appId: string,
  searchApiKey: string
): SearchClient {
  const client = algoliasearch(appId, searchApiKey)
  client.addAlgoliaAgent('LIVEHEALTHY_PRODUCTION_INDEX')

  return {
    ...client,
    search(requests) {
      const modifiedRequests = requests.map((searchParameters) => {
        const detachedSearchParams = {
          ...searchParameters.params,
          page: 0,
          facetFilters: [],
          numericFilters: [],
          optionalFilters: [],
          tagFilters: [],
        }

        if (searchParameters.indexName === querySuggestionsIndexName) {
          if (!querySuggestionsIndexName) {
            throw new Error(
              `A search request was sent to the Query Suggestions index but the index name is not specified as an environment variable 'NEXT_PUBLIC_INSTANTSEARCH_QUERY_SUGGESTIONS_INDEX_NAME'.`
            )
          }

          return {
            ...searchParameters,
            indexName: querySuggestionsIndexName,
            params: detachedSearchParams,
          }
        }

        return searchParameters
      })

      return client.search(modifiedRequests)
    },
  }
}

export function useSearchClient({
  appId,
  searchApiKey,
}: SearchClientHookOptions): SearchClient {
  return useMemo<SearchClient>(
    () => getSearchClient(appId, searchApiKey),
    [appId, searchApiKey]
  )
}
