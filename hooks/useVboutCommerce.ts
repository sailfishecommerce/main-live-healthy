import axios from 'axios'

import type {
  addCartItemType,
  createCartType,
  createOrderType,
  emptyCartItemType,
  removeCartItemType,
} from '@/typings/vbout-type'

const vboutEcommerceEndpoint = `https://api.vbout.com/1/ecommerce?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`

const vboutDefault = {
  domain: 'VBT-43304-6887',
}

export default function useVboutCommerce() {
  function createVboutCart(postData: createCartType) {
    return axios.post('/api/create-vbout-cart', postData)
  }

  function emptyVboutCart(postData: emptyCartItemType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/emptycart`, postDataObj)
  }

  function addVboutCartItem(postData: addCartItemType) {
    return axios.post('/api/add-vbout-cart-item', postData)
  }

  function removeVboutCartItem(postData: removeCartItemType) {
    const postDataObj = {
      ...vboutDefault,
      ...postData,
    }
    return axios.post(`${vboutEcommerceEndpoint}/removecartitem`, postDataObj)
  }

  function createVboutOrder(vboutOrder: createOrderType) {
    return axios.post('/api/create-vbout-order', vboutOrder)
  }

  return {
    createVboutCart,
    addVboutCartItem,
    removeVboutCartItem,
    createVboutOrder,
    emptyVboutCart,
  }
}
