import axios from 'axios'
import { useQuery } from 'react-query'

function getOrders() {
  return axios.get('/api/get-orders')
}
export default function useAdminOrder() {
  return useQuery('getInvoice', getOrders)
}

function getAllOrders() {
  return axios.get('/api/get-all-invoice')
}

export function useOrderInvoice() {
  return useQuery('getAllInvoice', getAllOrders)
}
