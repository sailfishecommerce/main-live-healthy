import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import CheckoutFlow from '@/components/Checkout/CheckoutFlow'
import { useAccount } from '@/hooks'
import Applayout from '@/layouts/app-layout'

export default function Checkout() {
  const router = useRouter()
  const checkoutId = router.query.checkoutId

  const { listUserSavedCreditCards } = useAccount()
  const { data } = useQuery(
    'listUserSavedCreditCards',
    listUserSavedCreditCards
  )

  console.log('data', data)

  return (
    <Applayout title="Checkout - Thanks for shopping with us">
      {checkoutId && <CheckoutFlow checkoutId={checkoutId} />}
    </Applayout>
  )
}
