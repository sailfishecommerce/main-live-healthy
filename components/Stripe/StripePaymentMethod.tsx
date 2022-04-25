import type { MutableRefObject } from 'react'
import { useRef, useEffect, memo } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { Button } from '@/components/UIElement'
import { useProcessPayment } from '@/hooks'
import { useAppSelector } from '@/hooks/useRedux'
import useStripeElement from '@/hooks/useStripeElement'
import styles from '@/styles/ui.module.css'

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

  useEffect(() => {
    createStripeElement()
  }, [])

  const { paymentForm }: any = useAppSelector((state) => state.payment)
  const inputRef = useRef(null)

  const { makePayment, loadingState } = useProcessPayment()

  function makePaymentHandler() {
    makePayment(paymentForm)
  }

  return (
    <div className="px-0 flex flex-col">
      <div className="flex mx-auto justify-center">
        {inputRef === null && <SpinnerRipple />}
      </div>
      <PaymentInput inputRef={inputRef} />
      <Button
        disable={loadingState}
        className={`${styles.uiElement} bg-red-500 border-2 border-red-500 hover:text-red-500 text-white w-1/4 md:w-1/6 h-8 hover:bg-transparent  mx-auto my-2 rounded`}
        text="Submit"
        type="submit"
        loading={loadingState}
        onClick={makePaymentHandler}
      />
    </div>
  )
}

const StripePaymentMethod = memo(StripePaymentMethodComponent)
export default StripePaymentMethod
