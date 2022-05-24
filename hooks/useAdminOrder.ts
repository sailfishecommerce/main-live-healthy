import axios from 'axios'
import { useQuery } from 'react-query'

function getOrders() {
  return axios.get('/api/get-orders')
}
export default function useAdminOrder() {
  return useQuery('getInvoice', getOrders)
}
