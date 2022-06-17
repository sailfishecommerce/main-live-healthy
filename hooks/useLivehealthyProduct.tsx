import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

type queryDataType = { query: any; id: string }

export default function useProductInRange(queryData: queryDataType) {
  const { id, query } = queryData
  const queryClient = useQueryClient()

  function getProductInRange() {
    return axios.post('/api/get-products-by-ratings', { query })
  }

  const { data, status, error } = useQuery(
    `getProductInRange-${id}`,
    getProductInRange,
    {
      staleTime: Infinity,
      placeholderData: () =>
        queryClient.getQueryData(`getProductInRange-${id}`),
    }
  )

  return [data?.data, status, error]
}

type useGetProductType = {
  query: { [key: string]: string }
  limit: number
  key: string
}

export function useGetProduct(queryData: useGetProductType) {
  const queryClient = useQueryClient()

  function getProductInRange() {
    return axios.post('/api/get-products', queryData)
  }

  const { data, status, error } = useQuery(
    `getProducts-${queryData.key}`,
    getProductInRange,
    {
      staleTime: Infinity,
      placeholderData: () =>
        queryClient.getQueryData(`getProducts-${queryData.key}`),
    }
  )

  return [data?.data, status, error]
}
