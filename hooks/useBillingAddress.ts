import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { useAccount, useCart, useToast } from '@/hooks'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function useBillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const { updateCheckoutAddress, getUserAccount } = useAccount()
  const { data: userDetails } = useQuery('userDetails', getUserAccount)

  const { useCartData } = useCart()
  const { loadingToast, updateToast } = useToast()
  const { data: cart, status } = useCartData()
  const toastID = useRef(null)

  const updateBillingAddressHandler = (address: string) =>
    setBillingAddress(address)

  function billingTagAddressHandler(tagValue: string) {
    if (tagValue === 'use-a-different-billing-address') {
      setCheckoutForm({ ...checkoutForm, billing: { form: 'billing' } })
    } else if (!cart.guest) {
      loadingToast(toastID)
      updateCheckoutAddress('billing', cart.shipping)
        .then(() => {
          updateToast(toastID, 'success', 'billing address updated')
          setCheckoutForm({
            ...checkoutForm,
            billing: {
              form: null,
            },
          })
        })
        .catch(() =>
          updateToast(toastID, 'error', 'unable to update billing address')
        )
    }
  }

  return {
    billingTagAddressHandler,
    updateBillingAddressHandler,
    billingAddress,
    cart,
    userDetails,
    status,
    checkoutForm,
    setCheckoutForm,
  }
}
