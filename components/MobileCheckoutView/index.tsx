import { useState } from 'react'

import CheckoutStepButtonGroup from '@/components/MobileCheckoutView/CheckoutStepButtonGroup'
import displayCheckoutView from '@/components/MobileCheckoutView/displayCheckoutView'

export default function MobileCheckoutView() {
  const [checkoutSteps, setCheckoutSteps] = useState(0)

  const stepHandler = (stepType: 'next' | 'prev') => {
    if (checkoutSteps <= 3 && stepType === 'next') {
      setCheckoutSteps((prevState) => prevState + 1)
    } else if (stepType === 'prev' && checkoutSteps <= 3 && checkoutSteps > 0) {
      setCheckoutSteps((prevState) => prevState - 1)
    }
  }

  return (
    <div>
      <div className="content">{displayCheckoutView(checkoutSteps)}</div>
      <CheckoutStepButtonGroup
        checkoutSteps={checkoutSteps}
        onClick={stepHandler}
      />
      <style jsx>
        {`
          .content {
            min-height: 350px;
          }
        `}
      </style>
    </div>
  )
}
