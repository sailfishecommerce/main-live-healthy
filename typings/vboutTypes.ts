export type baseType = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type cancelledOrderType = baseType & {
  total: string
  shipping: string
  subtotal: string
  orderNumber: string
  products: []
}

export type abandonDataType = baseType & {
  shippingAddress: string
  shippingCity: string
  shippingCountry: string
  billingAddress: string
  billingCity: string
  subtotal: string
  billingCountry: string
  shippingMethod: string
  orderNumber: string
  shippingPrice: string
}

export type orderConfirmationListType = abandonDataType & {
  total: string
}
