import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

export default function useLiveHealthyProduct(): any {
  const queryClient = useQueryClient()
  function fetchLiveHealthyProducts() {
    return axios.get('/api/get-livehealthy-product')
  }
  const { data, status, error } = useQuery(
    'fetchLiveHealthyProducts',
    fetchLiveHealthyProducts,
    {
      placeholderData: () =>
        queryClient.getQueryData('fetchLiveHealthyProducts'),
    }
  )

  return [data?.data, status, error]
}

type queryDataType = { query: any; id: string }

export function useProductInRange(queryData: queryDataType) {
  const { id, query } = queryData
  const queryClient = useQueryClient()

  function getProductInRange() {
    return axios.post('/api/get-products-by-ratings', { query })
  }

  const { data, status, error } = useQuery(
    `getProductInRange-${id}`,
    getProductInRange,
    {
      placeholderData: () =>
        queryClient.getQueryData(`getProductInRange-${id}`),
    }
  )

  return [data?.data, status, error]
}
