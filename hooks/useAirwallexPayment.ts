import axios from 'axios'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'

import { airwallexAtom } from '@/lib/atomConfig'
import { formatIntentData } from '@/lib/formatAirwallex'
import type { cartType } from '@/typings/types'

export default function useAirwallexPayment() {
  const [, setAirwallex] = useAtom(airwallexAtom)

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
        setAirwallex({
          clientSecret: data.client_secret,
          paymentIntentId: data.id,
        })
      })
      .catch((error) => {
        return toast.error(error.response?.data?.message)
      })
  }

  return {
    createAccessToken,
    createPaymentIntent,
    checkoutHandler,
  }
}
