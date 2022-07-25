/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import axios from 'axios'
import { useAtom } from 'jotai'

import useCart from '@/hooks/useCart'
import { courierAtom } from '@/lib/atomConfig'
import type { cartType } from '@/typings'
import {
  formatParcelData,
  formatRequestRate,
  formatShippingData,
} from '@/utils/formatShippingData'

export default function useEasyShip() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const [courierId] = useAtom(courierAtom)

  function listCouriers() {
    axios
      .get(`${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/couriers`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_PROD}`,
        },
      })
      .then((res) => console.log('res-list-all-courier', res.data))
      .catch((err) => console.error(err))
  }

  function requestRate() {
    const cartItem: cartType = cart
    const { shipping, account, currency, items } = cartItem
    const requestRateData = formatRequestRate(shipping, currency, account)

    items.map((item: any) => {
      const parcelItem = formatParcelData(item, currency)
      requestRateData.parcels[0].items.push(parcelItem)
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

  function createShipment() {
    const { shipping, account, currency } = cart

    const shipmentData = formatShippingData(
      shipping,
      currency,
      account,
      courierId
    )

    axios
      .post(
        `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/shipments`,
        shipmentData
      )
      .then((response) => console.log('createShipment-response', response))
      .catch((error) => console.log('error-createShipment', error))
    return shipmentData
  }
  return { listCouriers, requestRate, cart, createShipment }
}
