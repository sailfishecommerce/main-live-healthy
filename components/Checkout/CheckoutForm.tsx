import { Formik } from 'formik'
import { useAtom } from 'jotai'

import DeliveryAddress from '@/components/Checkout/DeliveryAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import { checkoutFormSchema } from '@/components/Form/schema/CheckoutFormSchema'
import useShippingPayment from '@/hooks/useShippingPayment'
import { completeOrderAtom, paymentFormAtom } from '@/lib/atomConfig'

export default function CheckoutForm() {
  const { formValues } = useShippingPayment()
  const [, setPaymentForm] = useAtom(paymentFormAtom)
  const [, setCompleteOrder] = useAtom(completeOrderAtom)

  return (
    <Formik
      initialValues={formValues}
      validationSchema={checkoutFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        setPaymentForm({ form: values, completed: true })
        setSubmitting(false)
        setCompleteOrder(true)
      }}
    >
      {(formik) => {
        const buttonStyle = formik.isValid ? 'bg-tan-hide' : 'bg-gray-300'
        return (
          <form
            className="flex gap-5 col-span-2"
            onSubmit={formik.handleSubmit}
          >
            <DeliveryAddress formik={formik} />
            <PaymentMethod>
              <button
                aria-label="complete order"
                type="submit"
                className={`w-full ${buttonStyle} p-3 text-xl mt-1 my-3  text-white text-center hover:bg-orange-700 font-normal shadow-lg rounded-xl`}
              >
                Complete Order
              </button>
            </PaymentMethod>
          </form>
        )
      }}
    </Formik>
  )
}
