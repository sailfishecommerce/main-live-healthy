/* eslint-disable no-console */
import { useAtom } from 'jotai'
import { BsCreditCard } from 'react-icons/bs'

import Accordion from '@/components/Accordion'
import AirwallexDropin from '@/components/Payment/AirwallexDropin'
import { useCart } from '@/hooks'
import useAirwallexPayment from '@/hooks/useAirwallexPayment'
import { airwallexAtom, checkoutAddressAtom } from '@/lib/atomConfig'

export default function AirwallexPaymentMethod() {
  const [checkoutAddress] = useAtom(checkoutAddressAtom)

  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const { checkoutHandler } = useAirwallexPayment()
  const [airwallex] = useAtom(airwallexAtom)

  function onCheckout() {
    checkoutHandler(cart, checkoutAddress)
  }

  const { clientSecret, paymentIntentId } = airwallex
  console.log('clientSecret', clientSecret, 'paymentIntentId', paymentIntentId)
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
