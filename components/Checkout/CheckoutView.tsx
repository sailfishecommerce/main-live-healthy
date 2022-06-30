import { useAtom } from 'jotai'

import CheckoutAddress from '@/components/Checkout/CheckoutAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import { submitCheckoutFormAtom } from '@/lib/atomConfig'

export default function CheckoutView() {
  const [, setSubmitCheckoutForm] = useAtom(submitCheckoutFormAtom)

  function submitFormHandler() {
    setSubmitCheckoutForm(true)
  }
  return (
    <>
      <CheckoutAddress />
      <PaymentMethod>
        <button
          aria-label="complete order"
          type="submit"
          className={`w-full p-3 text-xl mt-1 my-3 bg-red-500 text-white text-center hover:bg-orange-700 font-normal shadow-lg rounded-xl`}
          onClick={submitFormHandler}
        >
          Complete Order
        </button>
      </PaymentMethod>
    </>
  )
}
