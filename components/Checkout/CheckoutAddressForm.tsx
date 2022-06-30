/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import CheckoutForm from '@/components/Checkout/CheckoutForm'
import DisplaySavedAddress from '@/components/Shipping/DisplaySavedAddress'
import SavedAddressDropdown from '@/components/Shipping/SavedAddressDropdown'
import useBillingAddress from '@/hooks/useBillingAddress'
import { watchCheckoutFormAtom } from '@/lib/atomConfig'
import type { AddressFormProps } from '@/typings/types'

export default function CheckoutAddressForm({ addressType }: AddressFormProps) {
  const { checkoutForm, cart, status, setCheckoutForm } = useBillingAddress()
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )

  const toAddressValueArray = (cartObj: any) => {
    const cartArray = cartObj !== undefined ? Object.values(cartObj) : []
    return cartArray
  }

  useEffect(() => {
    if (status === 'success') {
      const cartAddressLength = toAddressValueArray(cart[addressType]).length
      if (cartAddressLength > 5) {
        setCheckoutForm({
          ...checkoutForm,
          [addressType]: {
            form: null,
          },
        })
        if (!watchCheckoutForm.includes(addressType)) {
          setWatchCheckoutForm([...watchCheckoutForm, addressType])
        }
      }
    }
  }, [status])

  return (
    <>
      {toAddressValueArray(cart?.shipping).length > 2 &&
        checkoutForm[addressType].form === 'shipping' && (
          <>
            <h3 className="font-bold my-5 text-lg">Shipping address</h3>
            <SavedAddressDropdown />
          </>
        )}
      {cart !== undefined &&
      toAddressValueArray(cart[addressType]).length > 5 &&
      checkoutForm[addressType].form === null ? (
        <DisplaySavedAddress addressType={addressType} />
      ) : (
        <CheckoutForm addressType={addressType} />
      )}
    </>
  )
}
