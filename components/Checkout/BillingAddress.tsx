import CheckoutAddressForm from '@/components/Checkout/CheckoutAddressForm'
import BillingTag from '@/components/Tag/BillingTag'
import useBillingAddress from '@/hooks/useBillingAddress'
import shippingTagsJson from '@/json/shipping.json'

export default function BillingAddress() {
  const {
    billingTagAddressHandler,
    updateBillingAddressHandler,
    billingAddress,
  } = useBillingAddress()

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
      {billingAddress && <CheckoutAddressForm addressType="billing" />}
    </div>
  )
}
