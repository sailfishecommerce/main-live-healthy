import DeliveryAddressTemp from '@/components/Checkout/DeliveryAddressTemp'
import PaymentMethod from '@/components/Checkout/PaymentMethod'

export default function CheckoutForm() {
  return (
    <>
      <DeliveryAddressTemp />
      <PaymentMethod>
        <button
          aria-label="complete order"
          type="submit"
          className={`w-full p-3 text-xl mt-1 my-3  text-white text-center hover:bg-orange-700 font-normal shadow-lg rounded-xl`}
        >
          Complete Order
        </button>
      </PaymentMethod>
    </>
  )
}
