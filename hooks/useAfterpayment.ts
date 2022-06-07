/* eslint-disable no-useless-concat */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { paymentFormAtom } from '@/lib/atomConfig'
import firebaseDatabase from '@/lib/firebaseDatabase'

export default function useAfterPayment() {
  const [, setPaymentForm] = useAtom(paymentFormAtom)
  const router = useRouter()

  function cleanUpAfterPayment(response: any) {
    //  set payment form to default
    setPaymentForm({
      form: {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        address: '',
        region: '',
        district: '',
        zip: '',
        phone: '',
      },
      completed: false,
    })
    // save payment response to database
    const { writeData } = firebaseDatabase()
    const paymentDatabaseRefId = 'payment/' + 'airwallex' + `/${response?.id}`
    writeData(paymentDatabaseRefId, {
      data: JSON.stringify(response),
    }).then(() => {
      return router.push('/checkout-complete')
    })
  }

  return {
    cleanUpAfterPayment,
  }
}
