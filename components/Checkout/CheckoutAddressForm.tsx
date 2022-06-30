import { useCallback } from 'react'

import CheckoutForm from '@/components/Checkout/CheckoutForm'
import DisplaySavedAddress from '@/components/Shipping/DisplaySavedAddress'
import SavedAddressDropdown from '@/components/Shipping/SavedAddressDropdown'
import useBillingAddress from '@/hooks/useBillingAddress'
import type { AddressFormProps } from '@/typings/types'

export default function CheckoutAddressForm({ addressType }: AddressFormProps) {
  const { checkoutForm, cart } = useBillingAddress()

  const toAddressValueArray = useCallback((cartObj: any) => {
    const cartArray = cartObj !== undefined ? Object.values(cartObj) : []
    return cartArray
  }, [])

  return (
    <>
      {toAddressValueArray(cart?.shipping).length > 2 && (
        <>
          <h3 className="font-bold my-5 text-lg">Shipping address</h3>
          <SavedAddressDropdown />
        </>
      )}
      {cart !== undefined &&
      toAddressValueArray(cart[addressType]).length > 6 &&
      checkoutForm.shipping.form === null ? (
        <DisplaySavedAddress addressType={addressType} />
      ) : (
        <CheckoutForm addressType={addressType} />
      )}
    </>
  )
}
