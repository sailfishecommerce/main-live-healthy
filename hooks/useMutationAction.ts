import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import useAlgoliaEvent from '@/hooks/useAlgoliaEvent'
import useSwellCart from '@/hooks/useSwellCart'
import useToast from '@/hooks/useToast'

export default function useMutationAction() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()
  const { algoliaEvent } = useAlgoliaEvent()

  const {
    emptyCart,
    deleteCart,
    updateCartItemQuantity,
    addToCart,
    removeCartItem,
  } = useSwellCart()

  function useUpdateCartItem() {
    const toastID = useRef(null)

    return useMutation(
      ({ product, quantity }: any) => updateCartItemQuantity(product, quantity),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, 'success', 'product quantity updated')
        },
        onError: () => {
          updateToast(toastID, 'error', 'error updating product quantity')
        },
      }
    )
  }

  function useAddItemToCart() {
    const toastID = useRef(null)

    return useMutation(
      ({ product, quantity }: any) => {
        algoliaEvent(
          'convertedObjectIDs',
          'Product Added to Cart',
          product.objectID
        )
        return addToCart(product, quantity)
      },
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, 'success', 'Product added to cart')
        },
        onError: () => {
          updateToast(toastID, 'error', 'error adding product to cart')
        },
      }
    )
  }

  function useRemoveFromCart() {
    const toastID = useRef(null)

    return useMutation(
      (item: any) => removeCartItem(item),

      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, 'success', 'product removed!')
        },
        onError: () => {
          updateToast(toastID, 'error', 'error removing product from cart')
        },
      }
    )
  }

  function useEmptyCartForAirwallex() {
    return useMutation(emptyCart, {
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
    })
  }

  function useEmptyCart() {
    const toastID = useRef(null)

    return useMutation(emptyCart, {
      onMutate: () => {
        loadingToast(toastID)
      },
      onSuccess: () => {
        updateToast(toastID, 'success', 'cart cleared')
      },
      onError: () => {
        updateToast(toastID, 'success', 'error clearing the cart')
      },
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
    })
  }

  function useDeleteCart() {
    const toastID = useRef(null)

    return useMutation(deleteCart, {
      onMutate: () => {
        loadingToast(toastID)
      },
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        updateToast(toastID, 'success', 'cart deleted')
      },
      onError: () => {
        updateToast(toastID, 'success', 'error deleting the cart')
      },
    })
  }

  function useUserAccountDetails(updateUserAccountDetails: any) {
    const toastID = useRef(null)

    return useMutation(
      ({ userDetails }: any): any => updateUserAccountDetails(userDetails),
      {
        mutationKey: 'useUserAccountDetails',
        onMutate: () => loadingToast(toastID),
        onSettled: () => queryClient.invalidateQueries('userDetails'),
        onSuccess: (response) => {
          if (response) {
            updateToast(toastID, 'success', 'profile details updated!')
          }
        },
        onError: () => {
          updateToast(toastID, 'error', 'error updating profile details')
        },
      }
    )
  }

  return {
    useUpdateCartItem,
    useAddItemToCart,
    useRemoveFromCart,
    useEmptyCart,
    useDeleteCart,
    useEmptyCartForAirwallex,
    useUserAccountDetails,
  }
}
