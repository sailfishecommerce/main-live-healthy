import searchInsights from 'search-insights'

import { indexName } from '@/utils/env'

type insightNameType =
  | 'clickedObjectIDs'
  | 'clickedObjectIDsAfterSearch'
  | 'convertedObjectIDs'
  | 'convertedObjectIDsAfterSearch'

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
