/* eslint-disable prefer-template */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import useMutationAction from '@/hooks/useMutationAction'
import { checkoutAddressAtom, watchCheckoutFormAtom } from '@/lib/atomConfig'
import firebaseDatabase from '@/lib/firebaseDatabase'

export default function useAfterPayment() {
  const [, setCheckoutAddress] = useAtom(checkoutAddressAtom)
  const [, setWatchCheckoutForm] = useAtom(watchCheckoutFormAtom)

  const router = useRouter()
  const { useEmptyCartForAirwallex } = useMutationAction()
  const emptyCart = useEmptyCartForAirwallex()

  function cleanUpAfterPayment(
    response: any,
    paymentType: 'airwallex' | 'stripe'
  ) {
    if (paymentType === 'airwallex') {
      emptyCart.mutate()
    }
    //  set payment form to default
    setCheckoutAddress(null)
    setWatchCheckoutForm([])

    // save payment response to database
    const { writeData } = firebaseDatabase()
    const paymentDatabaseRefId = 'payment/' + paymentType + `/${response?.id}`
    writeData(paymentDatabaseRefId, JSON.stringify(response)).then(() => {
      return router.push('/checkout-complete')
    })
  }

  return {
    cleanUpAfterPayment,
  }
}
