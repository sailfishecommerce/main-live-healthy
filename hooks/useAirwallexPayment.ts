/* eslint-disable no-unneeded-ternary */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { formatIntentData } from '@/lib/formatAirwallex'
import { updateAirwallexState } from '@/redux/airwallex-slice'
import type { cartType } from '@/types'

export default function useAirwallexPayment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const disableBtn = router.pathname.includes('checkout') ? true : false

  function createAccessToken() {
    return axios.request({
      url: `/api/get-payment-token`,
      method: 'get',
    })
  }

  function createPaymentIntent(requestBody: any) {
    return axios.request({
      url: `/api/create-payment-intent`,
      method: 'post',
      data: requestBody,
    })
  }

  function checkoutHandler(cart: cartType, paymentForm: any) {
    const paymentDetails = formatIntentData(cart, paymentForm)
    createAccessToken()
      .then(({ data }) => {
        return createPaymentIntent({
          auth: data.token,
          paymentDetails,
        })
      })
      .then(({ data }: any) => {
        dispatch(
          updateAirwallexState({
            clientSecret: data.client_secret,
            paymentIntentId: data.id,
          })
        )
      })
      .catch((error) => {
        toast.error(error.response?.data?.message)
      })
  }

  return {
    createAccessToken,
    createPaymentIntent,
    checkoutHandler,
    disableBtn,
  }
}
