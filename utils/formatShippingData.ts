import type { cartType } from '@/typings'
import type { useEasyShipRequestRateDataType } from '@/typings/hook-types'

function trimDescription(description: string) {
  const trimmedDescription = description.substring(0, 180)
  return trimmedDescription
}
export function formatParcelData(item: cartType['items'], currency: string) {
  const parcelItem = {
    quantity: item.quantity,
    category: 'Health & Beauty',
    description: trimDescription(item.product.description),
    sku: item.product.sku,
    actual_weight: 0.1,
    declared_currency: currency,
    declared_customs_value: item.price,
    dimensions: {
      length: 7.6,
      width: 3.8,
      height: 21.6,
    },
  }

  return parcelItem
}

export function formatRequestRate(
  shipping: cartType['shipping'],
  billing: cartType['billing'],
  currency: string,
  account: cartType['account']
) {
  const data: useEasyShipRequestRateDataType = {
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
  return data
}
