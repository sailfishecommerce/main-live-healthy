import { useAtom } from 'jotai'

import CheckoutAddress from '@/components/Checkout/CheckoutAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import { submitCheckoutFormAtom, watchCheckoutFormAtom } from '@/lib/atomConfig'

export default function CheckoutView() {
  const [, setSubmitCheckoutForm] = useAtom(submitCheckoutFormAtom)
  const [watchCheckoutForm] = useAtom(watchCheckoutFormAtom)

  const buttonStyle =
    watchCheckoutForm.length === 2
      ? 'bg-red-500 cursor-pointer'
      : 'bg-gray-400 cursor-arrow'

  const disableButton = watchCheckoutForm.length !== 2

  function submitFormHandler() {
    setSubmitCheckoutForm(true)
  }
  return (
    <>
      <CheckoutAddress />
      <PaymentMethod>
        <button
          disabled={disableButton}
          aria-label="complete order"
          type="submit"
          className={`w-full p-3 text-xl ${buttonStyle} mt-1 my-3  text-white text-center hover:bg-orange-700 font-normal shadow-lg rounded-xl`}
          onClick={submitFormHandler}
        >
          Complete Order
        </button>
      </PaymentMethod>
    </>
  )
}
