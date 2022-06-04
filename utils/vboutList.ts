import axios from 'axios'

import type {
  abandonDataType,
  baseType,
  cancelledOrderType,
  orderConfirmationListType,
} from '@/typings/vboutTypes'

export function abandonedOrdersListVbout(abandonData: abandonDataType) {
  const {
    firstName,
    lastName,
    email,
    phone,
    shippingAddress,
    shippingCity,
    shippingCountry,
    billingAddress,
    billingCity,
    billingCountry,
    shippingMethod,
    shippingPrice,
    subtotal,
    orderNumber,
  } = abandonData
  const data = {
    listid: 71005,
    email,
    status: 'active',
    fields: {
      373012: firstName,
      373013: lastName,
      373014: email,
      373015: phone,
      552855: shippingAddress,
      552856: shippingCity,
      552857: shippingCountry,
      552858: billingAddress,
      552859: billingCity,
      552860: billingCountry,
      552861: shippingMethod,
      552862: shippingPrice,
      552864: subtotal,
      552876: orderNumber,
    },
  }
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function cancelledOrdersListVbout(cancelledOrder: cancelledOrderType) {
  const {
    firstName,
    lastName,
    email,
    phone,
    total,
    subtotal,
    orderNumber,
    products,
    shipping,
  } = cancelledOrder
  const data = {
    listid: 71004,
    email,
    status: 'active',
    fields: {
      373012: firstName,
      373013: lastName,
      373014: email,
      373015: phone,
      552864: subtotal,
      552869: total,
      552875: orderNumber,
      552872: products,
      552871: shipping,
    },
  }
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function orderConfirmationListVbout(
  orderConfirmationList: orderConfirmationListType
) {
  const {
    firstName,
    lastName,
    email,
    phone,
    shippingAddress,
    shippingCity,
    shippingCountry,
    billingAddress,
    billingCity,
    billingCountry,
    shippingMethod,
    shippingPrice,
    subtotal,
    orderNumber,
    total,
  } = orderConfirmationList
  const data = {
    listid: 70983,
    email,
    status: 'active',
    fields: {
      373012: firstName,
      373013: lastName,
      373014: email,
      373015: phone,
      552855: shippingAddress,
      552856: shippingCity,
      552857: shippingCountry,
      552858: billingAddress,
      552859: billingCity,
      552860: billingCountry,
      552861: shippingMethod,
      552862: shippingPrice,
      552864: subtotal,
      552874: orderNumber,
      552866: total,
    },
  }
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function storePromotionalListVbout(storePromotionalList: baseType) {
  const { firstName, lastName, email, phone } = storePromotionalList
  const data = {
    listid: 70390,
    email,
    status: 'active',
    fields: {
      373012: firstName,
      373013: lastName,
      373014: email,
      373015: phone,
    },
  }
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}
