/* eslint-disable react-hooks/exhaustive-deps */
import type { MutableRefObject } from 'react'
import { useState, useRef, useEffect, memo } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useMakePayment from '@/hooks/useMakePayment'
import useStripeElement from '@/hooks/useStripeElement'

interface PaymentInputType {
  inputRef: MutableRefObject<null>
}

function PaymentInput({ inputRef }: PaymentInputType): JSX.Element {
  return (
    <div className="mb-0 w-full">
      <div ref={inputRef} id="card-element-id"></div>
    </div>
  )
}

function StripePaymentMethodComponent() {
  const { createStripeElement } = useStripeElement()
  const [showSpinner, setShowSpinner] = useState(true)
  const inputRef = useRef(null)
  const { makePaymentHandler } = useMakePayment()

  useEffect(() => {
    createStripeElement().then(() => setShowSpinner(false))
  }, [])

  return (
    <div className="px-0 flex flex-col">
      <div className="flex mx-auto justify-center">
        {showSpinner && <SpinnerRipple />}
      </div>
      <PaymentInput inputRef={inputRef} />
      <button
        aria-label="make payment"
        className="bg-mountain-green border border-green-500 hover:text-red-500 text-white w-1/4 md:w-1/6 h-8 hover:bg-transparent  mx-auto my-2 rounded"
        type="submit"
        onClick={makePaymentHandler}
      >
        Submit
      </button>
    </div>
  )
}

const StripePaymentMethod = memo(StripePaymentMethodComponent)
export default StripePaymentMethod
