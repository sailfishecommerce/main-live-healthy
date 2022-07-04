import { useQuery } from 'react-query'

import useSwellCart from '@/hooks/useSwellCart'
import useToast from '@/hooks/useToast'

export default function useCart() {
  const { isLoading, isSuccessful, hasError } = useToast()
  const { applyCouponCode, getACart, recoverCart } = useSwellCart()

  const useCartData = () => useQuery('cart', getACart)

  const useRecoverCartData = (checkoutId: any | string) =>
    useQuery(`recoverCart-${checkoutId}`, () => recoverCart(checkoutId))

  function applyDiscountCode(code: string) {
    const loading = isLoading()
    return applyCouponCode(code)
      .then((response) => {
        isSuccessful(loading, response?.message)
        return response
      })
      .catch((error) => {
        hasError(loading, error?.message)
        return error
      })
  }

  return {
    applyDiscountCode,
    useCartData,
    useRecoverCartData,
  }
}
