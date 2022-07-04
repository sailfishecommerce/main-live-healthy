import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useCart } from '@/hooks'
import useSwellCart from '@/hooks/useSwellCart'
import useToast from '@/hooks/useToast'

export default function useCoupon() {
  const { applyDiscountCode } = useCart()
  const { loadingToast, updateToast } = useToast()
  const { removeCouponCode } = useSwellCart()

  const [discountCode, setDiscountCode] = useState('')
  const queryClient = useQueryClient()
  const toastID = useRef(null)

  function couponInputHandler(e: any) {
    setDiscountCode(e.target.value)
  }

  function useAddCoupon() {
    return useMutation(() => applyDiscountCode(discountCode), {
      mutationKey: 'useAddCoupon',
      onMutate: () => loadingToast(toastID),
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        setDiscountCode('')
        updateToast(toastID, 'success', 'coupon added')
      },
      onError: () => {
        updateToast(toastID, 'error', 'error adding coupon')
      },
    })
  }

  function useRemoveCoupon() {
    return useMutation(() => removeCouponCode(), {
      mutationKey: 'useRemoveCoupon',
      onMutate: () => loadingToast(toastID),
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        setDiscountCode('')
        updateToast(toastID, 'success', 'coupon removed')
      },
      onError: () => {
        updateToast(toastID, 'error', 'error removing coupon')
      },
    })
  }

  return {
    couponInputHandler,
    useAddCoupon,
    useRemoveCoupon,
  }
}
