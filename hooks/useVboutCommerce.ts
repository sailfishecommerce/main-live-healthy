import axios from 'axios'

import type {
  addCartItemType,
  createCartType,
  creatOrderType,
  emptyCartItemType,
  removeCartItemType,
} from '@/typings/vbout-type'

const vboutEcommerceEndpoint = 'https://api.vbout.com/1/ecommerce'

const vboutDefault = {
  api_key: process.env.NEXT_PUBLIC_VBOUT_API_KEY,
  domain: 'VBT-43304-6887',
}

export default function useVboutCommerce() {
  function createVboutCart(postData: createCartType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/createcart`, postDataObj)
  }

  function emptyVboutCart(postData: emptyCartItemType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/emptycart`, postDataObj)
  }

  function addVboutCartItem(postData: addCartItemType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/addcartitem`, postDataObj)
  }

  function removeVboutCartItem(postData: removeCartItemType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/removecartitem`, postDataObj)
  }

  function createVboutOrder(vboutOrder: creatOrderType) {
    const postDataObj = {
      ...vboutDefault,
      ...vboutOrder,
    }
    return axios.post(`${vboutEcommerceEndpoint}/createorder`, postDataObj)
  }

  return {
    createVboutCart,
    addVboutCartItem,
    removeVboutCartItem,
    createVboutOrder,
    emptyVboutCart,
  }
}
