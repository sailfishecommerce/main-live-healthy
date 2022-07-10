import { useAtom } from 'jotai'

import useProcessPayment from '@/hooks/useProcessPayment'
import { checkoutAddressAtom } from '@/lib/atomConfig'

export default function useMakePayment() {
  const [checkoutAddress] = useAtom(checkoutAddressAtom)
  const { makePayment } = useProcessPayment()

  function makePaymentHandler() {
    return makePayment(checkoutAddress)
  }

  return { makePaymentHandler }
}
