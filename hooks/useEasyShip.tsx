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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_PROD}`,
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_PROD}`,
        },
      }
    )
  }

  function createShipment() {
    const { shipping, billing, account, currency } = cart

    const createShipmentData = {
      origin_address: {
        line_1: shipping.address1,
        state: billing.state,
        city: billing.city,
        postal_code: billing.zip,
        contact_phone: billing.phone,
        contact_name: billing.name,
        contact_email: account.email,
        company_name: account.email,
      },
      destination_address: {
        line_1: shipping.address1,
        state: shipping.state,
        city: shipping.city,
        postal_code: shipping.zip,
        contact_phone: shipping.phone,
        contact_email: account.email,
        contact_name: shipping.name,
        country_alpha2: shipping.country.toUpperCase(),
      },
      incoterms: 'DDU',
      insurance: {
        is_insured: false,
      },
      courier_selection: { apply_shipping_rules: true },
      shipping_settings: {
        unit: { weight: 'kg', dimensions: 'cm' },
        output_currency: currency,
      },
      parcels: [{ items: [] }],
    }
    return createShipmentData
  }

  return { listCouriers, requestRate, createShipment }
}
