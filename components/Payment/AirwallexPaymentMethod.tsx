import { BsCreditCard } from 'react-icons/bs'

import Accordion from '@/components/Accordion'
import AirwallexDropin from '@/components/Payment/AirwallexDropin'
import { useCart } from '@/hooks'
import useAirwallexPayment from '@/hooks/useAirwallexPayment'
import { useAppSelector } from '@/hooks/useRedux'

export default function AirwallexPaymentMethod() {
  const { paymentForm }: any = useAppSelector((state) => state.payment)
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const { checkoutHandler } = useAirwallexPayment()

  function onCheckout() {
    checkoutHandler(cart, paymentForm)
  }

  const { clientSecret, paymentIntentId } = useAppSelector(
    (state) => state.airwallex
  )
  console.log(' clientSecret, paymentIntentId', clientSecret, paymentIntentId)

  return (
    <Accordion
      stage={2}
      icon={<BsCreditCard size={32} />}
      title="Pay with Airwallex"
      onClick={onCheckout}
    >
      <span className="font-medium">Airwallex</span> - the safer, easier way to
      pay
      <AirwallexDropin
        intent_id={paymentIntentId}
        client_secret={clientSecret}
      />
    </Accordion>
  )
}
