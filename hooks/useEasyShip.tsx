/* eslint-disable array-callback-return */
import axios from 'axios'
import { useAtom } from 'jotai'

import { courierAtom } from '@/lib/atomConfig'
import {
  formatParcelData,
  formatShippingData,
} from '@/utils/formatShippingData'

export default function useEasyShip() {
  const [courierId] = useAtom(courierAtom)

  function createShipment(order: any) {
    const { items, shipping, account, number } = order
    const shipmentData = formatShippingData(
      shipping,
      account,
      courierId,
      number
    )
    items.map((item: any) => {
      const parcelItem = formatParcelData(item)
      shipmentData.parcels[0].items.push(parcelItem)
    })

    return axios.post(
      `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/shipments`,
      shipmentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_PROD}`,
        },
      }
    )
  }
  return { createShipment }
}
