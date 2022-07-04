import axios from 'axios'

import useSwell from '@/hooks/useSwell'
import type { productOptionType, productType } from '@/typings/types'

export default function useSwellCart() {
  const { swellInit } = useSwell()

  async function getACart() {
    const { swell } = await swellInit()
    return await swell.cart.get()
  }

  async function addToCart(product: productType, quantity: number) {
    const { swell } = await swellInit()
    return await swell.cart.addItem({
      product_id: product.id,
      quantity,
    })
  }

  async function addToCartModal(
    product: productType,
    productQuantity: any,
    productOptions: productOptionType
  ) {
    const { swell } = await swellInit()
    return await swell.cart.addItem({
      product_id: product.id,
      quantity: productQuantity,
      options: productOptions,
    })
  }

  async function updateCartItem(product: any) {
    const { swell } = await swellInit()
    return await swell.cart.updateItem(product.id, product.updateData)
  }

  async function updateCartItemQuantity(
    product: productType,
    quantity: number
  ) {
    const { swell } = await swellInit()
    return await swell.cart.updateItem(product.id, {
      quantity,
    })
  }

  async function removeCartItem(cartItem: { id: string }) {
    const { swell } = await swellInit()
    return await swell.cart.removeItem(cartItem.id)
  }

  async function emptyCart() {
    const { swell } = await swellInit()
    return await swell.cart.setItems([])
  }

  async function recoverCart(checkoutId: string) {
    const { swell } = await swellInit()
    return await swell.cart.recover(checkoutId)
  }

  async function submitOrder() {
    const { swell } = await swellInit()
    return await swell.cart.submitOrder()
  }

  async function deleteCart(cartId: string) {
    return await axios.post('/api/cart/delete', {
      id: cartId,
    })
  }

  async function applyCouponCode(code: string) {
    const { swell } = await swellInit()
    return await swell.cart.applyCoupon(code)
  }

  async function removeCouponCode() {
    const { swell } = await swellInit()
    return await swell.cart.removeCoupon()
  }

  async function updateCartAccountID(account_id: string) {
    const { swell } = await swellInit()
    await swell.cart.update({ account_id })
  }
  async function updateCart(account: any) {
    const { swell } = await swellInit()
    await swell.cart.update(account)
  }

  return {
    getACart,
    addToCart,
    updateCartItem,
    removeCartItem,
    updateCartItemQuantity,
    emptyCart,
    submitOrder,
    applyCouponCode,
    removeCouponCode,
    recoverCart,
    deleteCart,
    addToCartModal,
    updateCartAccountID,
    updateCart,
  }
}
