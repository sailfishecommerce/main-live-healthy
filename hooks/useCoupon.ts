import { useState } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '.'

export default function useCoupon() {
  const { applyDiscountCode } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [allDiscount, setAllDiscount] = useState<any>([])

  function couponInputHandler(e: any) {
    setDiscountCode(e.target.value)
  }

  function onSubmitCoupon(e: any) {
    e.preventDefault()
    if (discountCode.length !== 0) {
      setLoading(true)
      applyDiscountCode(discountCode)
        .then((response) => {
          setLoading(false)
          if (response.couponCode === discountCode) {
            toast.success('coupon discount successful')
            setAllDiscount([...allDiscount, response?.coupon])
          }
        })
        .catch((error) => {
          setLoading(false)
          toast.error(error?.message)
        })
    } else {
      toast.error('please enter a coupon')
    }
  }

  return {
    loading,
    couponInputHandler,
    onSubmitCoupon,
    allDiscount,
  }
}
