// useAccount types

export type checkoutData = {
  firstName: string
  lastName: string
  email?: string
}

export type userLoginType = {
  email: string
  password: string
}

export type userDetailsType = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type createUserAccountAtCheckoutData = checkoutData & {
  address1: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export type useEasyShipRequestRateDataType = {
  origin_address: { [key: string]: string | null }
  destination_address: { [key: string]: string }
  incoterms: string
  insurance: { [key: string]: boolean }
  courier_selection?: { [key: string]: boolean | string | null }
  shipping_settings: {
    unit: { [key: string]: string }
    output_currency: string
  }
  parcels: [
    {
      items: useEasyShipParcelType[]
    }
  ]
}

export type useEasyShipParcelType = {
  [key: string]: number | string | { [key: string]: number }
}
