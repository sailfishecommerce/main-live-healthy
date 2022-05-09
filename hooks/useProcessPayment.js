/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useRouter, ReactText } from 'next/router'
import { useState } from 'react'

import { useToast, useAccount, useCart } from '@/hooks'
import useModal from '@/hooks/useModal'
import usePayment from '@/hooks/usePayment'
import useSwellCart from '@/hooks/useSwellCart'
import { createVboutOrder } from '@/hooks/useVbout'
import { vboutOrderData } from '@/lib/vbout'
import { updateCart } from '@/redux/cart-slice'
import { sendProductReview, updateSubmittedOrder } from '@/redux/payment-slice'

export default function useProcessPayment() {
  const router = useRouter()
  const { tokenizePayment, submitUserOrder } = usePayment()
  const { getACart } = useSwellCart()
  const { useCartData } = useCart()
  const { onShowModal } = useModal()
  const { data: cart } = useCartData()
  const {
    updateUserBillingInfo,
    createUserAddresstAtCheckout,
    getUserAccount,
  } = useAccount()
  const [loadingState, setLoadingState] = useState(false)
  const { isLoading, isSuccessful, hasError } = useToast()

  function processPayment(data, loading) {
    function vboutOrder(order) {
      return createVboutOrder(vboutOrderData(cart, order))
    }
    setLoadingState(true)
    tokenizePayment()
      .then((tokenPaymentResponse) => {
        console.log('tokenPaymentResponse', tokenPaymentResponse)
        if (!tokenPaymentResponse?.code) {
          getACart()
            .then((response) => {
              console.log('response makePayment', response)
              updateUserBillingInfo(data, response.billing.card?.token)
                .then((response) => {
                  console.log('response userBilling', response)
                  submitUserOrder()
                    .then((response) => {
                      console.log('submitOrder', response)
                      if (response.paid) {
                        setLoadingState(false)
                        dispatch(sendProductReview(true))
                        vboutOrder(response)
                        isSuccessful(loading, 'payment successful')
                        dispatch(
                          updateSubmittedOrder({
                            account: response?.account,
                            orderNumber: response?.number,
                            products: response?.items,
                          })
                        )
                        router.push('/checkout-complete')
                        dispatch(updateCart(null))
                      }
                      return response
                    })
                    .catch((error) => {
                      console.log('error submitUserOrder', error)
                      hasError(loading, error?.message)
                      setLoadingState(false)
                    })
                })
                .catch((error) => {
                  console.log('updateUserBillingInfo error', error)
                  hasError(loading, error?.message)
                  setLoadingState(false)
                })
            })
            .catch((error) => {
              hasError(loading, error?.message)
              setLoadingState(false)
            })
        } else {
          hasError(loading, tokenPaymentResponse?.message)
          setLoadingState(false)
        }
      })
      .catch((err) => {
        console.log('error makePayment', err)
        hasError(loading, err?.message)
        setLoadingState(false)
      })
  }

  function makePayment(data) {
    const loading = isLoading()
    getUserAccount()
      .then((response) => {
        console.log('response getUserDetails', response)
        if (response === null) {
          console.log('data createUserAddresstAtCheckout', data)
          createUserAddresstAtCheckout(data)
            .then((response) => {
              console.log('createUserAddresstAtCheckout', response)
              if (response !== null && response?.email?.code === 'UNIQUE') {
                hasError(
                  loading,
                  'you have an existing account with us, please login'
                )
                onShowModal(
                  'CHECKOUT_NOTIFICATION_MODAL',
                  response.email.fields.email
                )
              } else {
                processPayment(data, loading)
              }
            })
            .catch((err) => {
              console.log('err createUserAddresstAtCheckout', err)
              hasError(loading, err?.message)
            })
        } else {
          processPayment(data, loading)
        }
      })
      .catch((error) => {
        console.log('get user details', error)
        hasError(loading, error?.message)
      })
  }

  return {
    makePayment,
    loadingState,
  }
}
