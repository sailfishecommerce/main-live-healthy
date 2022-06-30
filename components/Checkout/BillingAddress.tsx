import { useState } from 'react'

import BillingTag from '@/components/Tag/BillingTag'
import shippingTagsJson from '@/json/shipping.json'

export default function BillingAddress() {
  const [billingAddress, setBillingAddress] = useState('same-shipping-address')
  const updateBillingAddress = (address: string) => setBillingAddress(address)
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
          className="w-full md:w-2/3 lg:my-3"
        />
      ))}
      {billingAddress === 'use-a-different-billing-address' && (
        <form>
          <input
            type="text"
            placeholder="Enter your billing address"
            className="w-full p-3 border rounded-xl"
          />
        </form>
      )}
    </div>
  )
}
