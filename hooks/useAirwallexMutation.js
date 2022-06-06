import { getElement, confirmPaymentIntent } from 'airwallex-payment-elements'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useMutation } from 'react-query'

import useToast from '@/hooks/useToast'

function confirmIntent(intent_id, client_secret) {
  const card = getElement('card')
  return confirmPaymentIntent({
    element: card,
    id: intent_id,
    client_secret,
    payment_method_options: {
      card: {
        auto_capture: true,
      },
    },
  })
}

export default function useAirwallex() {
  const { loadingToast, updateToast, toast } = useToast()
  const router = useRouter()

  const useMakePayment = () => {
    const toastID = useRef(null)

    return useMutation(
      ({ intent_id, client_secret }) => confirmIntent(intent_id, client_secret),
      {
        mutationKey: 'useAirwallex',
        onMutate: () => {
          loadingToast(toastID)
        },
        onSuccess: (response) => {
          console.log('response', response)
          window.alert(
            `Payment Intent confirmation was successful: ${JSON.stringify(
              response
            )}`
          )
          updateToast(toastID, toast.TYPE.SUCCESS, 'thanks for subscribing')
          router.push('/checkout-complete')
        },
        onError: (error) => {
          console.log('error', error)
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            'error subscribing to newsletter'
          )
        },
      }
    )
  }

  return { useMakePayment }
}
