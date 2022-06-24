import searchInsights from 'search-insights'

import { indexName } from '@/utils/env'

type insightNameType =
  | 'clickedFilters'
  | 'clickedObjectIDs'
  | 'clickedObjectIDsAfterSearch'
  | 'convertedObjectIDs'
  | 'convertedObjectIDsAfterSearch'
  | 'viewedFilters'
  | 'viewedObjectIDs'

export default function useAlgoliaEvent() {
  function algoliaEvent(
    insightName: insightNameType,
    eventName: string,
    hitObjectD: string
  ) {
    return searchInsights(insightName, {
      index: indexName,
      eventName,
      objectIDs: [hitObjectD],
    })
  }

  return { algoliaEvent }
}
