import { useAppSelector } from './useRedux'

export default function useAlgoliaEvents() {
  const { userToken }: any = useAppSelector((state) => state.user)

  const searchInsight = async () =>
    (await import(/* webpackChunkName: 'common' */ 'search-insights')).default

  function initializeAlgolia(aa: any) {
    aa('init', {
      appId: `${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`,
      apiKey: `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}`,
      useCookie: false,
    })
  }

  async function itemViewed(eventName: string, objectIDs: string[] | any) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('viewedObjectIDs', {
      eventName,
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      objectIDs,
    })
  }

  async function filterViewed(filters: string[]) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('viewedFilters', {
      eventName: 'filter_viewed',
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      filters,
    })
  }

  async function filterClicked(filters: string[]) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('clickedFilters', {
      eventName: 'filter_clicked',
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      filters,
    })
  }

  async function productAddedToCart(objectIDs: string[] | any) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('convertedObjectIDs', {
      eventName: 'product_added_to_cart',
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      objectIDs,
    })
  }

  async function clickedItem(eventName: string, objectIDs: string[]) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('clickedObjectIDs', {
      eventName,
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      objectIDs,
    })
  }

  async function convertedItemAfterSearch(
    eventName: string,
    queryID: string,
    objectIDs: string[]
  ) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('convertedObjectIDsAfterSearch', {
      eventName,
      userToken,
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      queryID,
      objectIDs,
    })
  }

  async function clickedItemAfterSearch(
    queryID: string,
    objectIDs: string[],
    positions: number[],
    eventName: string
  ) {
    const aa = await searchInsight()
    initializeAlgolia(aa)
    aa('clickedObjectIDsAfterSearch', {
      index: 'LIVEHEALTHY_PRODUCTION_INDEX',
      userToken,
      eventName,
      queryID,
      objectIDs,
      positions,
    })
  }

  return {
    filterViewed,
    filterClicked,
    productAddedToCart,
    clickedItem,
    itemViewed,
    convertedItemAfterSearch,
    clickedItemAfterSearch,
  }
}

// "Product clicked after a search",
