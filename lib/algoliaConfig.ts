import algoliasearch from 'algoliasearch/lite'

export const algoliaClient = algoliasearch(
  `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
  `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
)
