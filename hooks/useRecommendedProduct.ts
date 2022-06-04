/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { useGetProduct } from '@/hooks/useLivehealthyProduct'
import useSwellProducts from '@/hooks/useSwellProducts'

export default function useRecommendedProduct(cartItems: any) {
  const { getProduct } = useSwellProducts()
  const cartIndex = cartItems.length - 1

  const randomCartItem = useMemo(() => {
    const randomNum = Math.round(Math.random() * cartIndex)
    const selectRandomCartItem = cartItems[randomNum]
    return selectRandomCartItem
  }, [cartItems.length])
  const productId = randomCartItem?.productId

  const { data: dt } = useQuery(`getAProduct-${productId}`, () =>
    getProduct(productId)
  )
  const query = {
    query: { product_type_2: dt?.data.product_type_2 },
    limit: 15,
    key: dt?.data.id,
  }
  const [data, status] = useGetProduct(query)

  return [data, status]
}
