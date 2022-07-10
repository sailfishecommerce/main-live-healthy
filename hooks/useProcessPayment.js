/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useRef, useState } from 'react'
import { useAtom } from 'jotai'

import { useToast, useAccount, useCart } from '@/hooks'
import useModal from '@/hooks/useModal'
import usePayment from '@/hooks/usePayment'
import useSwellCart from '@/hooks/useSwellCart'
import { createVboutOrder } from '@/hooks/useVbout'
import { vboutOrderData } from '@/lib/vbout'
import { sendProductReviewAtom, submitOrderAtom } from '@/lib/atomConfig'
import useAfterPayment from '@/hooks/useAfterpayment'

export default function useProcessPayment() {
  const { tokenizePayment, submitUserOrder } = usePayment()
  const { getACart } = useSwellCart()
  const { useCartData } = useCart()
  const { updateModalView } = useModal()
  const { data: cart } = useCartData()

  const { createUserAddresstAtCheckout, getUserAccount } = useAccount()
  const [loadingState, setLoadingState] = useState(false)
  const { loadingToast, updateToast } = useToast()
  const [, setSubmitOrder] = useAtom(submitOrderAtom)
  const [, setSendProductReview] = useAtom(sendProductReviewAtom)
  const { cleanUpAfterPayment } = useAfterPayment()
  const toastID = useRef()

  function processPayment(data) {
    function vboutOrder(order) {
      const formatVboutOrderData = vboutOrderData(cart, order)
      return createVboutOrder(formatVboutOrderData, setLog)
    }
    loadingToast(toastID)
    setLoadingState(true)
    tokenizePayment()
      .then((tokenPaymentResponse) => {
        // console.log('tokenPaymentResponse,', tokenPaymentResponse)
        if (!tokenPaymentResponse?.code) {
          getACart()
            .then(() => {
              // console.log('getCart,', response)
              return submitUserOrder()
                .then((response) => {
                  // console.log('stripe-response', response)
                  if (response.paid) {
                    setLoadingState(false)
                    setSendProductReview(true)
                    vboutOrder(response)
                    updateToast(toastID, 'success', 'payment successful')
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
                  updateToast(toastID, 'error', error?.message)
                  setLoadingState(false)
                })
            })
            .catch((error) => {
              updateToast(toastID, 'error', error?.message)
              setLoadingState(false)
            })
        } else {
          updateToast(toastID, 'error', tokenPaymentResponse?.message)
          setLoadingState(false)
        }
      })
      .catch((err) => {
        updateToast(toastID, 'error', err?.message)
        setLoadingState(false)
      })
  }

  function makePayment(data) {
    getUserAccount()
      .then((response) => {
        if (response === null) {
          createUserAddresstAtCheckout(data.shipping)
            .then((response) => {
              if (response !== null && response?.email?.code === 'UNIQUE') {
                updateToast(
                  toastID,
                  'error',
                  'you have an existing account with us, please login'
                )
                updateModalView('MODAL_LOGIN')
              } else {
                processPayment(data)
              }
            })
            .catch((err) => {
              updateToast(toastID, 'error', err?.message)
            })
        } else {
          processPayment(data)
        }
      })
      .catch((error) => {
        updateToast(toastID, 'error', error?.message)
      })
  }

  return {
    makePayment,
    loadingState,
  }
}
