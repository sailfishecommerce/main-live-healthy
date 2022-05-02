import { useDispatch } from 'react-redux'

import { updatePaymentForm } from '@/redux/payment-slice'

export default function useMakePayment() {
  const dispatch = useDispatch()

  const updatePaymentEmail = (e: any) =>
    dispatch(
      updatePaymentForm({
        form: {
          [e.target.name]: e.target.value,
        },
      })
    )
  return updatePaymentEmail
}
