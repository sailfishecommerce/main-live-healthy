import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import CheckoutButton from '@/components/MobileCheckoutView/CheckoutButton'
import useMakePayment from '@/hooks/useMakePayment'

interface Props {
  onClick: (step: 'next' | 'prev') => void
  checkoutSteps: number
}

export default function CheckoutStepButtonGroup({
  onClick,
  checkoutSteps,
}: Props) {
  const { makePaymentHandler } = useMakePayment()

  return (
    <div className="controls px-4">
      {checkoutSteps !== 0 && (
        <CheckoutButton
          className="border border-black text-black"
          onClick={() => onClick('prev')}
        >
          <BsArrowLeft className="mr-3 font-bold mt-1" />
          Previous step
        </CheckoutButton>
      )}
      {checkoutSteps <= 3 ? (
        <CheckoutButton
          className="bg-tan-hide text-white"
          onClick={() => onClick('next')}
        >
          Next step <BsArrowRight className="ml-3 font-bold mt-2" />
        </CheckoutButton>
      ) : (
        <CheckoutButton
          className="bg-tan-hide text-white"
          onClick={makePaymentHandler}
        >
          Complete Order
        </CheckoutButton>
      )}
    </div>
  )
}
