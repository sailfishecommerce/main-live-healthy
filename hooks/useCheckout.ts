import { updateCheckoutProcess } from '@/redux/checkout-slice'
import type { checkoutStageProcess } from '@/types'

import { useAppDispatch, useAppSelector } from './useRedux'

export default function useCheckout() {
  const dispatch = useAppDispatch()
  const { checkout } = useAppSelector((state) => state.checkout)

  function updateCheckoutHandler(CheckoutStage: checkoutStageProcess) {
    dispatch(updateCheckoutProcess(CheckoutStage))
  }

  return {
    updateCheckoutHandler,
    checkout,
  }
}
