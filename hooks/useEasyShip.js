import axios from 'axios'
import useCart from '@/hooks/useCart'

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

  function trimDescription(description) {
    const trimmedDescription = description.substring(0, 180)
    return trimmedDescription
  }

  function requestRate() {
    const { shipping, billing, account, currency, items } = cart

    const data = {
      origin_address: {
        line_1: billing.address1,
        state: billing.state,
        city: billing.city,
        postal_code: billing.zip,
        contact_phone: billing.phone,
        contact_name: billing.name,
        contact_email: account.email,
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
    items.map((item) => {
      const parcelItem = {
        quantity: item.quantity,
        category: 'Health & Beauty',
        description: trimDescription(item.product.description),
        sku: item.product.sku,
        actual_weight: 0.3,
        declared_currency: currency,
        declared_customs_value: item.price,
        dimensions: {
          length: 7.6,
          width: 3.8,
          height: 21.6,
        },
      }
      data.parcels[0].items.push(parcelItem)
    })
    return axios.post(
      `${process.env.NEXT_PUBLIC_EASYSHIP_BASE_URL}/rates`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EASYSHP_SAND}`,
        },
      }
    )
  }

  return { listCouriers, requestRate }
}
