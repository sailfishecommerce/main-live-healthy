import { useAtom } from 'jotai'
import { useRef, useState } from 'react'

import { useAccount, useCart, useToast } from '@/hooks'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function useBillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const { updateCheckoutAddress } = useAccount()
  const { useCartData } = useCart()
  const { loadingToast, updateToast } = useToast()
  const { data: cart } = useCartData()
  const toastID = useRef(null)

  const updateBillingAddressHandler = (address: string) =>
    setBillingAddress(address)

  function billingTagAddressHandler(tagValue: string) {
    if (tagValue === 'use-a-different-billing-address') {
      setCheckoutForm({ ...checkoutForm, billing: { form: 'billing' } })
    } else {
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
  }
}
