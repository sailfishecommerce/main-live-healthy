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
    queryID: string,
    hitObjectD: string
  ) {
    const objectIDs = { objectIDs: [hitObjectD] }

    return searchInsights(insightName, {
      index: indexName,
      eventName,
      ...objectIDs,
      queryID,
    })
  }

  return { algoliaEvent }
}
