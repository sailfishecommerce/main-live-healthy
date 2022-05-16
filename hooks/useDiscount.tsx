import axios from 'axios'
import { useQuery } from 'react-query'

// import discountData from '@/json/discount.json'

export default function useDiscount() {
  function getAvailableDiscounts() {
    return axios.get('/api/get-available-discount')
  }
  const { data, status, error } = useQuery(
    'availableDiscount',
    getAvailableDiscounts,
    {
      staleTime: Infinity,
      // placeholderData: discountData,
    }
  )
  return [data?.data, status, error]
}
