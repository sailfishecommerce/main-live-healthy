/* eslint-disable import/order */
/* eslint-disable no-console */
import { getElement, confirmPaymentIntent } from 'airwallex-payment-elements'
import { useEffect, useState, memo, useRef } from 'react'
import { useAtom } from 'jotai'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useToast } from '@/hooks'
import useAfterPayment from '@/hooks/useAfterpayment'
import { loadAirwallexUi } from '@/lib/airwallex-payment'
import useEasyShip from '@/hooks/useEasyShip'
import { courierAtom } from '@/lib/atomConfig'

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
  const { cleanUpAfterPayment } = useAfterPayment()
  const { loadingToast, updateToast } = useToast()
  const toastID = useRef(null)
  const { createShipment } = useEasyShip()
  const [, setCourierId] = useAtom(courierAtom)

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
    loadingToast(toastID)
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
        .then((response: any) => {
          console.log('response-airwallexpayment', response)
          setIsSubmitting(false)
          updateToast(toastID, 'success', 'Payment successful')
          cleanUpAfterPayment(response, 'airwallex')
          createShipment(response)
            .then((responseVal) => {
              console.log('createShipment-response', responseVal)
              setCourierId(null)
            })
            .catch((error) => {
              console.log('error-createShipment', error)
              setCourierId(null)
            })
        })
        .catch((error) => {
          setIsSubmitting(false)
          setErrorMessage(error.message)
          updateToast(toastID, 'error', error.message)
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
        <div className="authFormContainer"></div>
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
