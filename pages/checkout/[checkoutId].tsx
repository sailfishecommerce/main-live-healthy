import { useRouter } from 'next/router'

import CheckoutFlow from '@/components/Checkout/CheckoutFlow'
import Applayout from '@/layouts/app-layout'

export default function Checkout() {
  const router = useRouter()
  const checkoutId = router.query.checkoutId

  return (
    <Applayout title="Checkout - Thanks for shopping with us">
      {checkoutId && <CheckoutFlow checkoutId={checkoutId} />}
    </Applayout>
  )
}
