/* eslint-disable unused-imports/no-unused-vars */
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useSwellCart from '@/hooks/useSwellCart'

export default function useMutationAction() {
  const queryClient = useQueryClient()
  const {
    emptyCart,
    deleteCart,
    updateCartItemQuantity,
    addToCart,
    addToCartModal,
    removeCartItem,
  } = useSwellCart()

  function useUpdateCartItem() {
    return useMutation(
      ({ product, quantity }: any) => updateCartItemQuantity(product, quantity),
      {
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          toast.success('product quantity updated')
        },
        onError: () => {
          toast.error('error updating product quantity')
        },
      }
    )
  }

  function useAddItemToCart() {
    return useMutation(
      ({ product, quantity }: any) => addToCart(product, quantity),
      {
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: (response) => {
          console.log('response useAddItemToCart', response)
          toast.success('product added to cart')
        },
        onError: () => {
          toast.error('error adding product to cart')
        },
      }
    )
  }

  function useRemoveFromCart() {
    return useMutation((item: any) => removeCartItem(item), {
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        toast.success('product removed!')
      },
      onError: () => {
        toast.error('error removing product from cart')
      },
    })
  }

  function useEmptyCart() {
    return useMutation(emptyCart, {
      onSuccess: () => {
        toast.success('cart cleared')
      },
      onError: () => {
        toast.error('error clearing the cart')
      },
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
    })
  }

  function useDeleteCart() {
    return useMutation(deleteCart, {
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: (data) => {
        toast.success('cart deleted')
      },
      onError: (data) => {
        toast.error('error deleting cart')
      },
    })
  }

  return {
    useUpdateCartItem,
    useAddItemToCart,
    useRemoveFromCart,
    useEmptyCart,
    useDeleteCart,
  }
}
