/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'

import { useToast, useAccount, useCart } from '@/hooks'
import useModal from '@/hooks/useModal'
import usePayment from '@/hooks/usePayment'
import useSwellCart from '@/hooks/useSwellCart'
import { createVboutOrder } from '@/hooks/useVbout'
import { vboutOrderData } from '@/lib/vbout'
import { sendProductReviewAtom, submitOrderAtom } from '@/lib/atomConfig'

export default function useProcessPayment() {
  const router = useRouter()
  const { tokenizePayment, submitUserOrder } = usePayment()
  const { getACart } = useSwellCart()
  const { useCartData } = useCart()
  const { updateModalView } = useModal()
  const { data: cart } = useCartData()
  const {
    updateUserBillingInfo,
    createUserAddresstAtCheckout,
    getUserAccount,
  } = useAccount()
  const [loadingState, setLoadingState] = useState(false)
  const { isLoading, isSuccessful, hasError } = useToast()
  const [, setSubmitOrder] = useAtom(submitOrderAtom)
  const [, setSendProductReview] = useAtom(sendProductReviewAtom)

  function processPayment(data, loading) {
    function vboutOrder(order) {
      return createVboutOrder(vboutOrderData(cart, order))
    }
    setLoadingState(true)
    tokenizePayment()
      .then((tokenPaymentResponse) => {
        if (!tokenPaymentResponse?.code) {
          getACart()
            .then((response) => {
              updateUserBillingInfo(data, response.billing.card?.token)
                .then((response) => {
                  submitUserOrder()
                    .then((response) => {
                      if (response.paid) {
                        setLoadingState(false)
                        setSendProductReview(true)
                        vboutOrder(response)
                        isSuccessful(loading, 'payment successful')
                        setSubmitOrder({
                          account: response?.account,
                          orderNumber: response?.number,
                          products: response?.items,
                        })
                        router.push('/checkout-complete')
                      }
                      return response
                    })
                    .catch((error) => {
                      hasError(loading, error?.message)
                      setLoadingState(false)
                    })
                })
                .catch((error) => {
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
        hasError(loading, err?.message)
        setLoadingState(false)
      })
  }

  function makePayment(data) {
    const loading = isLoading()
    getUserAccount()
      .then((response) => {
        if (response === null) {
          createUserAddresstAtCheckout(data.form)
            .then((response) => {
              if (response !== null && response?.email?.code === 'UNIQUE') {
                hasError(
                  loading,
                  'you have an existing account with us, please login'
                )
                updateModalView('MODAL_LOGIN')
              } else {
                processPayment(data, loading)
              }
            })
            .catch((err) => {
              hasError(loading, err?.message)
            })
        } else {
          processPayment(data, loading)
        }
      })
      .catch((error) => {
        hasError(loading, error?.message)
      })
  }

  return {
    makePayment,
    loadingState,
  }
}
