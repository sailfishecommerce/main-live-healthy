/* eslint-disable consistent-return */
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
    hitObjectD: string,
    queryIDVal?: string,
    position?: number
  ) {
    const eventQueryID = queryIDVal
      ? { queryID: queryIDVal, positions: [position] }
      : ''
    if (hitObjectD) {
      return searchInsights(insightName, {
        index: indexName,
        eventName,
        objectIDs: [hitObjectD],
        ...eventQueryID,
      })
    }
  }

  return { algoliaEvent }
}
