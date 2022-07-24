/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import axios from 'axios'

import useCart from '@/hooks/useCart'
import type { cartType } from '@/typings'
import { formatParcelData, formatRequestRate } from '@/utils/formatShippingData'

export default function useEasyShip() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()

  function listCouriers() {
    axios
      .get(`${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/couriers`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_SAND}`,
        },
      })
      .then((res) => console.log('res-list-all-courier', res.data))
      .catch((err) => console.error(err))
  }

  function requestRate() {
    const cartItem: cartType = cart
    const { shipping, billing, account, currency, items } = cartItem
    const requestRateData = formatRequestRate(
      shipping,
      billing,
      currency,
      account
    )

    items.map((item: any) => {
      const parcelItem = formatParcelData(item, currency)
      requestRateData.parcels[0].items.push(parcelItem)
    })
    return axios.post(
      `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/rates`,
      requestRateData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_SAND}`,
        },
      }
    )
  }

  return { listCouriers, requestRate }
}
