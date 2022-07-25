/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import CheckoutAddressForm from '@/components/Checkout/CheckoutAddressForm'
import DisplaySavedAddress from '@/components/Shipping/DisplaySavedAddress'
import BillingTag from '@/components/Tag/BillingTag'
import useBillingAddress from '@/hooks/useBillingAddress'
import shippingTagsJson from '@/json/shipping.json'

export default function BillingAddress() {
  const {
    billingTagAddressHandler,
    updateBillingAddressHandler,
    cart,
    billingAddress,
  } = useBillingAddress()
  const [showAddress, setShowAddress] = useState(false)

  const billingAddressArray =
    cart !== null && typeof cart === 'object'
      ? Object.values(cart?.billing)
      : []

  useEffect(() => {
    const timer: any =
      !showAddress &&
      setTimeout(() => {
        setShowAddress(true)
      }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="billingAddress mt-4">
      <h3 className="font-bold text-xl">Billing Address</h3>
      <p className="my-2 text-base">
        Select the address that matches your card or payment method
      </p>
      {shippingTagsJson.map((billing) => {
        return (
          !(
            billingAddressArray.length > 0 &&
            billing.value === 'same-shipping-address'
          ) && (
            <BillingTag
              key={billing.value}
              content={billing}
              shippingMethod={billingAddress}
              updateShippingMethod={updateBillingAddressHandler}
              addressHandler={() => billingTagAddressHandler(billing.value)}
              className="w-full lg:my-3"
            />
          )
        )
      })}
      {billingAddress && <CheckoutAddressForm addressType="billing" />}
      {showAddress && billingAddressArray.length > 0 && (
        <DisplaySavedAddress addressType="billing" />
      )}
    </div>
  )
}
