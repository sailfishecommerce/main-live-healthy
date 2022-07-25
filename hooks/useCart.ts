import { useQuery } from 'react-query'

import useSwellCart from '@/hooks/useSwellCart'

export default function useCart() {
  const { applyCouponCode, getACart, recoverCart } = useSwellCart()

  const useCartData = () =>
    useQuery('cart', getACart, {
      staleTime: Infinity,
    })

  const useRecoverCartData = (checkoutId: any | string) =>
    useQuery(`recoverCart-${checkoutId}`, () => recoverCart(checkoutId))

  function applyDiscountCode(code: string) {
    return applyCouponCode(code)
  }

  return {
    applyDiscountCode,
    useCartData,
    useRecoverCartData,
  }
}
