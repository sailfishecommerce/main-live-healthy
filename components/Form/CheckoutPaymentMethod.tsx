/* eslint-disable unused-imports/no-unused-vars */
import { toast } from 'react-toastify'

import Accordion from '@/components/Accordion'
import AirwallexPaymentMethod from '@/components/Airwallex/AirwallexPaymentMethod'
import BankTransferPaymentMethod from '@/components/Form/BankTransferPaymentMethod'
import PaymentWithStripe from '@/components/Stripe/PaymentWithStripe'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { accordionButtonStyle } from '@/lib/single-Checkout'
import { updateFormStage } from '@/redux/payment-slice'

export default function CheckoutPaymentMethod() {
  const { stage }: any = useAppSelector((state) => state.payment)
  const dispatch = useAppDispatch()
  const accordion = accordionButtonStyle(stage)

  function paymentHandler() {
    dispatch(updateFormStage(1))
    if (stage === 1) {
      toast.error('Please complete stage 1')
    }
  }

  return (
    <Accordion
      // onClick={paymentHandler}
      stage={2}
      title=" Choose payment method"
    >
      <PaymentWithStripe />
      <AirwallexPaymentMethod />
      <BankTransferPaymentMethod />
    </Accordion>
  )
}

// CheckoutPaymentMethod.whyDidYouRender = true;
