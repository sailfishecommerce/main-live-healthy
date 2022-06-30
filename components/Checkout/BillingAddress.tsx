import { useAtom } from 'jotai'
import { useState } from 'react'

import CheckoutAddressForm from '@/components/Checkout/CheckoutAddressForm'
import BillingTag from '@/components/Tag/BillingTag'
import { useAccount, useCart } from '@/hooks'
import shippingTagsJson from '@/json/shipping.json'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function BillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const { updateCheckoutAddress } = useAccount()
  const { useCartData } = useCart()
  const { data: cart } = useCartData()

  const updateBillingAddressHandler = (address: string) =>
    setBillingAddress(address)

  function billingTagAddressHandler(tagValue: string) {
    if (tagValue === 'use-a-different-billing-address') {
      setCheckoutForm({ ...checkoutForm, billing: { form: 'billing' } })
    } else if (tagValue !== 'use-a-different-billing-address' && cart) {
      updateCheckoutAddress('billing', cart.shipping)
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
          updateShippingMethod={updateBillingAddressHandler}
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
