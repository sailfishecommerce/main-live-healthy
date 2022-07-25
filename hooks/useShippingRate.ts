import axios from 'axios'

import useCart from '@/hooks/useCart'
import type { cartType } from '@/typings'
import { formatParcelData, formatRequestRate } from '@/utils/formatShippingData'

export default function useShippingRate() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const cartItem: cartType = cart
  const { shipping, account, items } = cartItem

  function requestRate() {
    const requestRateData = formatRequestRate(shipping, account)

    items.map((item: any) => {
      const parcelItem = formatParcelData(item)
      return requestRateData.parcels[0].items.push(parcelItem)
    })

    return axios.post(
      `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/rates`,
      requestRateData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_PROD}`,
        },
      }
    )
  }
  return { requestRate, cart }
}
