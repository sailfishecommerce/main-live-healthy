/* eslint-disable no-alert */
import { getElement, confirmPaymentIntent } from 'airwallex-payment-elements'
import { useRouter } from 'next/router'
import { useEffect, useState, memo } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useToast } from '@/hooks'
import { loadAirwallexUi } from '@/lib/airwallex-payment'

interface AirwallexDropinProps {
  intent_id: any | string
  client_secret: any | string
}

function AirwallexCardElement({
  intent_id,
  client_secret,
}: AirwallexDropinProps) {
  const [elementShow, setElementShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()
  const { isLoading, isSuccessful, hasError } = useToast()

  useEffect(() => {
    loadAirwallexUi()

    const onReady = (): void => {
      setElementShow(true)
      getElement('card')?.focus()
    }

    const onError = (event: CustomEvent): void => {
      const { error } = event.detail
      setIsSubmitting(false)
      setErrorMessage(error.message ?? JSON.stringify(error))
    }

    window.addEventListener('onReady', onReady as EventListener)
    window.addEventListener('onError', onError as EventListener)
    return () => {
      window.removeEventListener('onReady', onReady as EventListener)
      window.removeEventListener('onError', onError as EventListener)
    }
  }, [])

  const triggerConfirm = (): void => {
    setIsSubmitting(true)
    const toastId = isLoading()
    const card: any = getElement('card')
    if (card) {
      confirmPaymentIntent({
        element: card,
        id: intent_id,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      })
        .then((response) => {
          setIsSubmitting(false)
          isSuccessful(toastId, 'Payment successful')
          window.alert(
            `Payment Intent confirmation was successful: ${JSON.stringify(
              response
            )}`
          )
          router.push('/checkout-complete')
        })
        .catch((error) => {
          setIsSubmitting(false)
          setErrorMessage(error.message)
          hasError(toastId, error.message)
        })
    }
  }

  const fieldContainerStyle = elementShow ? 'block' : 'none'

  return (
    <div>
      {!elementShow && (
        <div className="loader flex m-auto justify-center">
          <SpinnerRipple />
        </div>
      )}
      {errorMessage.length > 0 && (
        <p
          className="alert bg-danger text-white text-center font-bold"
          id="error"
        >
          {errorMessage}
        </p>
      )}
      <div className={`field-container ${fieldContainerStyle}`}>
        <div
          id="airwallexCard"
          className="border border-gray-200 p-2 rounded-md h-10 items-center focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        />
        <button
          type="button"
          className="bg-red-500 flex justify-center items-center border-2 border-red-500 hover:text-red-500 text-white w-1/4 md:w-1/6 h-8 hover:bg-transparent  mx-auto my-2 rounded"
          aria-label="Make Payment"
          disabled={isSubmitting}
          onClick={triggerConfirm}
        >
          Submit
        </button>
      </div>
      <style jsx>{`
        .block {
          display: block;
        }
        .none {
          display: none;
        }
      `}</style>
    </div>
  )
}

const AirwallexCard = memo(AirwallexCardElement)

export default AirwallexCard
