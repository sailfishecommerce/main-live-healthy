/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import CheckoutForm from '@/components/Checkout/CheckoutForm'
import DisplaySavedAddress from '@/components/Shipping/DisplaySavedAddress'
import SavedAddressDropdown from '@/components/Shipping/SavedAddressDropdown'
import useBillingAddress from '@/hooks/useBillingAddress'
import useModal from '@/hooks/useModal'
import useWatchCheckout from '@/hooks/useWatchCheckout'
import { checkoutAddressAtom } from '@/lib/atomConfig'
import type { AddressFormProps } from '@/typings/types'

export const toAddressValueArray = (cartObj: any) => {
  const cartArray =
    cartObj !== null && typeof cartObj === 'object'
      ? Object.values(cartObj)
      : []
  return cartArray
}

export default function CheckoutAddressForm({ addressType }: AddressFormProps) {
  const { checkoutForm, cart, status, setCheckoutForm } = useBillingAddress()
  const { updateModalView } = useModal()

  const [checkoutAddress, setCheckoutAddress] = useAtom(checkoutAddressAtom)
  useWatchCheckout(addressType)

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
        setCheckoutAddress({
          ...checkoutAddress,
          shipping: cart[addressType],
        })
      }
    }
  }, [])

  return (
    <>
      {toAddressValueArray(cart?.shipping).length > 2 &&
        addressType === 'shipping' && (
          <>
            <h3 className="font-bold my-5 text-lg">Shipping address</h3>
            {cart?.guest && (
              <p className="font-semibold">
                Hello Guest, click here to{' '}
                <button
                  type="button"
                  className="font-bold text-red-500"
                  onClick={() => updateModalView('MODAL_LOGIN')}
                >
                  Login
                </button>
              </p>
            )}
            {!cart?.guest && <SavedAddressDropdown />}
          </>
        )}
      {cart !== undefined &&
      toAddressValueArray(cart[addressType]).length > 5 &&
      checkoutForm[addressType].form === null ? (
        addressType === 'shipping' && (
          <DisplaySavedAddress addressType={addressType} />
        )
      ) : (
        <CheckoutForm addressType={addressType} />
      )}
    </>
  )
}
