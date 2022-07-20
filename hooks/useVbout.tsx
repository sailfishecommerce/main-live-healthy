import axios from 'axios'

import {
  formatCreateVboutOrder,
  formatVboutCategoryView,
} from '@/lib/formatVbout'
import type {
  addCategoryViewType,
  addProductSearchType,
  createVboutOrderType,
} from '@/typings/types'

export function addNewUserToList(email: string) {
  const data: any = {
    email,
    status: 'active',
    listid: 55592,
  }

  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function contactusFormList(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) {
  const data: any = {
    email,
    status: 'active',
    listid: 71630,
    fields: {
      373012: name,
      373015: phone,
      554979: subject,
      554935: message,
    },
  }

  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

type removeVboutCartType = {
  cartId: string
  productId: string
}

export function removeVboutCartItem(item: removeVboutCartType) {
  const data = {
    domain: 'VBT-43304-6887',
    cartid: item.cartId,
    productid: item.productId,
  }
  axios.post(
    `https://api.vbout.com/1/ecommerce/removecartitem?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function createVboutOrder(item: createVboutOrderType) {
  const data = formatCreateVboutOrder(item)
  return axios.post(
    `https://api.vbout.com/1/ecommerce/createorder?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function sendBankTransfer(
  email: string,
  listid: string,
  firstName: string,
  lastName: string
) {
  const data = {
    email,
    status: 'active',
    listid,
    fields: {
      373012: firstName,
      373013: lastName,
    },
  }
  return axios.post(
    `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function addProductSearch(content: addProductSearchType) {
  const data = {
    domain: 'VBT-43304-6887',
    uniqueid: content.id,
    customer: content.email,
    query: content.query,
  }
  return axios.post(
    `https://api.vbout.com/1/ecommerce/addproductsearch?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function addCategoryView(content: addCategoryViewType) {
  const data = formatVboutCategoryView(content)
  return axios.post(
    `https://api.vbout.com/1/ecommerce/addcategoryview?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
    data
  )
}

export function addEmailToNewsletter(email: string, listid: number) {
  return axios.post('/api/add-email-to-newsletter', { email, listid })
}

export function getAllVboutList() {
  return axios.get(
    `https://api.vbout.com/1/emailmarketing/getlists.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`
  )
}
