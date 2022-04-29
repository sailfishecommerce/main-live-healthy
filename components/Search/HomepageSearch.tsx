import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'

import '@algolia/autocomplete-theme-classic'
import AlgoliaAutocomplete from '@/components/Search/AlgoliaAutoComplete'
import { SearchItem } from '@/components/Search/SearchItem'

export default function HomepageSearch() {
  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )

  return (
    <div className="search flex bg-gray-100 rounded-md py-2 px-4 items-center">
      <AlgoliaAutocomplete
        openOnFocus={true}
        getSources={({ query }: any) => [
          {
            sourceId: 'products',
            // console.log('query',query),
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'New_Livehealthy_products_index',
                    query,
                  },
                ],
              })
            },
            templates: {
              item({ item, components }: any) {
                console.log('item', item)
                return <SearchItem hit={item} components={components} />
              },
            },
          },
        ]}
      />
    </div>
  )
}
