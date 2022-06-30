import { useAtom } from 'jotai'
import { useState } from 'react'

import CheckoutAddressForm from '@/components/Checkout/CheckoutAddressForm'
import BillingTag from '@/components/Tag/BillingTag'
import shippingTagsJson from '@/json/shipping.json'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function BillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const updateBillingAddress = (address: string) => setBillingAddress(address)
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)

  function billingTagAddressHandler(tagValue: string) {
    if (tagValue === 'use-a-different-billing-address') {
      setCheckoutForm({ ...checkoutForm, billing: { form: 'billing' } })
    }
  }

  return (
    <div className="billingAddress mt-4">
      <h3 className="font-bold text-xl">Billing Address</h3>
      <p className="my-2 text-base">
        Select the address that matches your card or payment method
      </p>
      {shippingTagsJson.billing.map((billing) => (
        <BillingTag
          key={billing.value}
          content={billing}
          shippingMethod={billingAddress}
          updateShippingMethod={updateBillingAddress}
          addressHandler={() => billingTagAddressHandler(billing.value)}
          className="w-full lg:my-3"
        />
      ))}
      {billingAddress === 'use-a-different-billing-address' && (
        <CheckoutAddressForm addressType="billing" />
      )}
    </div>
  )
}
