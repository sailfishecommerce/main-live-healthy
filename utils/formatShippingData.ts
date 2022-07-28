import type { cartType } from '@/typings'
import type { useEasyShipRequestRateDataType } from '@/typings/hook-types'

export function formatParcelData(item: cartType['items']) {
  const parcelItem = {
    quantity: item.quantity,
    category: 'Health & Beauty',
    description: item.product.name,
    sku: item.product.sku,
    actual_weight: 0.1,
    declared_currency: 'HKD',
    declared_customs_value: item.price,
    dimensions: {
      length: 10,
      width: 15,
      height: 10,
    },
  }

  return parcelItem
}

export function formatDataRate(
  shipping: cartType['shipping'],
  account: cartType['account']
) {
  const data: useEasyShipRequestRateDataType = {
    origin_address: {
      line_1: 'Flat B, 16/F,Tower 7, kennedy town',
      line_2: 'The Beaumount, 8 Shek Kok Road',
      state: 'Hong Kong',
      city: 'kennedy town',
      postal_code: null,
      contact_phone: '+85269600055',
      company_name: 'LiveHealthy stores',
      contact_name: 'Wong',
      contact_email: 'care@livehealthy.com.hk',
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
    shipping_settings: {
      unit: { weight: 'kg', dimensions: 'cm' },
      output_currency: 'HKD',
    },
    parcels: [{ items: [] }],
  }
  return data
}

export function formatRequestRate(
  shipping: cartType['shipping'],
  account: cartType['account']
) {
  const requestData = formatDataRate(shipping, account)
  const data: useEasyShipRequestRateDataType = {
    ...requestData,
    courier_selection: { apply_shipping_rules: true },
  }
  return data
}

type formatShippingDataType = useEasyShipRequestRateDataType & {
  order_data: {
    [key: string]: string
  }
}

export function formatShippingData(
  shipping: cartType['shipping'],
  account: cartType['account'],
  selectedCourierId: string | null,
  orderNumber: string
) {
  const requestData = formatDataRate(shipping, account)
  const data: formatShippingDataType = {
    ...requestData,
    order_data: {
      platform_name: 'Swell - Livehealthy store',
      platform_order_number: orderNumber,
    },
    courier_selection: {
      apply_shipping_rules: true,
      selected_courier_id: selectedCourierId,
    },
  }
  return data
}
