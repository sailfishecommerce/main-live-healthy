import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
} from 'react-instantsearch-dom'

import '@algolia/autocomplete-theme-classic'

export default function HomepageSearch() {
  const searchClient = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
  )

  return (
    <InstantSearch
      indexName="New_Livehealthy_products_index"
      searchClient={searchClient}
    >
      <div className="search relative flex bg-gray-100 rounded-md py-2 px-4 items-center">
        <Configure hitsPerPage={6} />
        <SearchBox />
        <div className="hits absolute">
          <Hits hitComponent={Hit} />
        </div>
      </div>
    </InstantSearch>
  )
}

function Hit(props: any) {
  console.log('props', props)
  return (
    <div>
      {/* <img src={props.hit.image} align="left" alt={props.hit.name} /> */}
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  )
}
