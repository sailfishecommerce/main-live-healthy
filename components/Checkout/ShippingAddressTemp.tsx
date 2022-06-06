import BillingAddress from '@/components/Checkout/BillingAddress'
import ShippingAddress from '@/components/Checkout/ShippingAddress'

export default function ShippingAddressTemp() {
  return (
    <div className="w-full height-fit-content bg-white p-4 my-4 md:my-0 mx-0 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">2. Specify details</h3>
      <ShippingAddress />
      <BillingAddress />
    </div>
  )
}
