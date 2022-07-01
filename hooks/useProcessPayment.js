/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react'
import { useAtom } from 'jotai'

import { useToast, useAccount, useCart } from '@/hooks'
import usePayment from '@/hooks/usePayment'
import useSwellCart from '@/hooks/useSwellCart'
import { createVboutOrder } from '@/hooks/useVbout'
import { vboutOrderData } from '@/lib/vbout'
import { sendProductReviewAtom, submitOrderAtom } from '@/lib/atomConfig'
import useAfterPayment from '@/hooks/useAfterpayment'
import { logsAtom } from '@/lib/atomConfig'

export default function useProcessPayment() {
  const { tokenizePayment, submitUserOrder } = usePayment()
  const { getACart } = useSwellCart()
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const [, setLog] = useAtom(logsAtom)

  const { updateUserBillingInfo } = useAccount()
  const [loadingState, setLoadingState] = useState(false)
  const { isLoading, isSuccessful, hasError } = useToast()
  const [, setSubmitOrder] = useAtom(submitOrderAtom)
  const [, setSendProductReview] = useAtom(sendProductReviewAtom)
  const { cleanUpAfterPayment } = useAfterPayment()

  function processPayment(data, loading) {
    function vboutOrder(order) {
      const formatVboutOrderData = vboutOrderData(cart, order)
      return createVboutOrder(formatVboutOrderData, setLog)
    }
    setLoadingState(true)
    tokenizePayment()
      .then((tokenPaymentResponse) => {
        if (!tokenPaymentResponse?.code) {
          getACart()
            .then((response) => {
              updateUserBillingInfo(data, response.billing.card?.token)
                .then((response) => {
                  console.log('updateUserBillingInfo-response', response)
                  submitUserOrder()
                    .then((response) => {
                      console.log('stripe-response', response)
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
                        cleanUpAfterPayment(response, 'stripe')
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
    processPayment(data, loading)
  }

  function stripePayment(data) {
    const loading = isLoading()
    processPayment(data, loading)
  }

  return {
    makePayment,
    loadingState,
    stripePayment,
  }
}
