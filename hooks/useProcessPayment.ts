/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'

import { useToast, useAccount, useCart } from '@/hooks'
import useAfterPayment from '@/hooks/useAfterpayment'
import useEasyShip from '@/hooks/useEasyShip'
import useModal from '@/hooks/useModal'
import useOrder from '@/hooks/useOrder'
import usePayment from '@/hooks/usePayment'
import useSwellCart from '@/hooks/useSwellCart'
import { createVboutOrder } from '@/hooks/useVbout'
import {
  courierAtom,
  sendProductReviewAtom,
  submitOrderAtom,
} from '@/lib/atomConfig'
import { vboutOrderData } from '@/lib/vbout'

export default function useProcessPayment() {
  const { tokenizePayment, submitUserOrder } = usePayment()
  const { getACart } = useSwellCart()
  const { useCartData } = useCart()
  const { updateModalView } = useModal()
  const { data: cart } = useCartData()

  const { createUserAddress, getUserAccount, createUserAccountAtCheckout } =
    useAccount()
  const [loadingState, setLoadingState] = useState(false)
  const { loadingToast, updateToast } = useToast()
  const [, setSubmitOrder] = useAtom(submitOrderAtom)
  const [, setSendProductReview] = useAtom(sendProductReviewAtom)
  const { cleanUpAfterPayment } = useAfterPayment()
  const toastID = useRef()
  const { createShipment } = useEasyShip()
  const { getLastOrderDetails } = useOrder()
  const [, setCourierId] = useAtom(courierAtom)

  function processPayment() {
    function vboutOrder(order: any) {
      const formatVboutOrderData = vboutOrderData(cart, order)
      return createVboutOrder(formatVboutOrderData)
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
                  console.log('stripe-response', response)
                  if (response.paid) {
                    getLastOrderDetails()
                      .then((response) => {
                        console.log('getLastOrderDetails', response)
                        createShipment(response)
                          .then((response) => {
                            console.log('createShipment-response', response)
                            setCourierId(null)
                          })
                          .catch((error) => {
                            console.log('error-createShipment', error)
                            setCourierId(null)
                          })
                      })
                      .catch((err) =>
                        console.log('err-getLastOrderDetails', err)
                      )
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

  function makePayment(data: any) {
    getUserAccount()
      .then((response) => {
        if (response === null) {
          createUserAddress(data.shipping)
            .then((response: any) => {
              if (response !== null && response?.email?.code === 'UNIQUE') {
                updateToast(
                  toastID,
                  'error',
                  'you have an existing account with us, please login'
                )
                updateModalView('MODAL_LOGIN')
              } else {
                createUserAccountAtCheckout(data).then((response) => {
                  console.log('response', response)
                  processPayment()
                })
              }
            })
            .catch((err: any) => {
              updateToast(toastID, 'error', err?.message)
            })
        } else {
          processPayment()
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
