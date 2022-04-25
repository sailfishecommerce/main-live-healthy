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
