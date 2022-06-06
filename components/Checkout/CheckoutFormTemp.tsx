import DeliveryAddressTemp from '@/components/Checkout/DeliveryAddressTemp'
import PaymentMethod from '@/components/Checkout/PaymentMethod'

export default function CheckoutFormTemp() {
  return (
    <>
      <DeliveryAddressTemp />
      <PaymentMethod>
        <button
          aria-label="complete order"
          type="submit"
          className={`w-full p-3 text-xl mt-1 my-3 bg-red-500 text-white text-center hover:bg-orange-700 font-normal shadow-lg rounded-xl`}
        >
          Complete Order
        </button>
      </PaymentMethod>
    </>
  )
}
