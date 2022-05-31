/* eslint-disable no-console */
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useSwellCart from '@/hooks/useSwellCart'
import useToast from '@/hooks/useToast'
import { addEmailToNewsletter } from '@/hooks/useVbout'

import useUpdateAccountdetails from './useUpdateAccountdetails'

type addEmailToNewsletterType = {
  email: string
  listid: number
}

export default function useMutationAction() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()

  const { updateUserAccountDetails } = useUpdateAccountdetails()

  const {
    emptyCart,
    deleteCart,
    updateCartItemQuantity,
    addToCart,
    removeCartItem,
  } = useSwellCart()

  function useAddEmailToNewsletter() {
    const toastID = useRef(null)

    return useMutation(
      ({ email, listid }: addEmailToNewsletterType) =>
        addEmailToNewsletter(email, listid),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: (response) => {
          console.log('response-onSuccess', response)
          updateToast(toastID, toast.TYPE.SUCCESS, 'thanks for subscribing')
        },
        onError: () => {
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            'error subscribing to newsletter'
          )
        },
      }
    )
  }

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
          updateToast(toastID, toast.TYPE.SUCCESS, 'product quantity updated')
        },
        onError: () => {
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            'error updating product quantity'
          )
        },
      }
    )
  }

  function useAddItemToCart() {
    const toastID = useRef(null)
    return useMutation(
      ({ product, quantity }: any) => addToCart(product, quantity),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, 'Product added to cart')
        },
        onError: () => {
          updateToast(toastID, toast.TYPE.ERROR, 'error adding product to cart')
        },
      }
    )
  }

  function useRemoveFromCart() {
    const toastID = useRef(null)

    return useMutation((item: any) => removeCartItem(item), {
      onMutate: () => {
        loadingToast(toastID)
      },
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        updateToast(toastID, toast.TYPE.SUCCESS, 'product removed!')
      },
      onError: () => {
        updateToast(
          toastID,
          toast.TYPE.ERROR,
          'error removing product from cart'
        )
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
        updateToast(toastID, toast.TYPE.SUCCESS, 'cart cleared')
      },
      onError: () => {
        updateToast(toastID, toast.TYPE.SUCCESS, 'error clearing the cart')
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
        updateToast(toastID, toast.TYPE.SUCCESS, 'cart deleted')
      },
      onError: () => {
        updateToast(toastID, toast.TYPE.SUCCESS, 'error deleting the cart')
      },
    })
  }

  function useUserAccountDetails() {
    const toastID = useRef(null)

    return useMutation(
      ({ userDetails }: any): any => updateUserAccountDetails(userDetails),
      {
        mutationKey: 'useUserAccountDetails',
        onMutate: () => loadingToast(toastID),
        onSettled: () => queryClient.invalidateQueries('userDetails'),
        onSuccess: (response) => {
          if (response) {
            updateToast(toastID, toast.TYPE.SUCCESS, 'profile details updated!')
          }
        },
        onError: (err) => {
          console.log('err', err)
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            'error updating profile details'
          )
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
    useAddEmailToNewsletter,
    useUserAccountDetails,
  }
}
