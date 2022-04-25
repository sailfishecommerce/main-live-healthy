/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import useMutationAction from './useMutationAction'

import { useToast } from '.'

export default function useShoppingCart() {
  const { useRemoveFromCart, useAddItemToCartModal, useUpdateCartItem } =
    useMutationAction()
  const { loadToast, successToast, errorToast } = useToast()
  const { useAddItemToCart } = useMutationAction()
  const removeCartItem = useRemoveFromCart()
  const addItemToCart = useAddItemToCart()
  const addItemToCartModal = useAddItemToCartModal()
  const updateCartItem = useUpdateCartItem()

  function loadingState(mutator: any, data: string) {
    mutator.isLoading
      ? loadToast()
      : mutator.isError
      ? errorToast('an error occured, please try again')
      : mutator.isSuccess
      ? successToast(data)
      : null
  }

  return {
    addItemToCart,
    removeCartItem,
    addItemToCartModal,
    updateCartItem,
    loadingState,
  }
}
