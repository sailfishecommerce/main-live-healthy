import axios from 'axios'
import { useQuery } from 'react-query'

export default function useDiscount() {
  function getAvailableDiscounts() {
    return axios.get('/api/get-available-discount')
  }
  const { data, status, error } = useQuery(
    'availableDiscount',
    getAvailableDiscounts,
    {
      staleTime: Infinity,
    }
  )
  return [data?.data, status, error]
}
