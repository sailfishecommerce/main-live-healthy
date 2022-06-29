import { useAtom } from 'jotai'

import useProcessPayment from '@/hooks/useProcessPayment'
import { paymentFormAtom } from '@/lib/atomConfig'

export default function useMakePayment() {
  const [paymentForm] = useAtom(paymentFormAtom)
  const { makePayment } = useProcessPayment()

  function makePaymentHandler() {
    makePayment(paymentForm)
  }

  return { makePaymentHandler }
}
