/* eslint-disable array-callback-return */
/* eslint-disable no-console */
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

    axios
      .post(
        `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/shipments`,
        shipmentData
      )
      .then((response) => console.log('createShipment-response', response))
      .catch((error) => console.log('error-createShipment', error))
    return shipmentData
  }
  return { createShipment }
}
