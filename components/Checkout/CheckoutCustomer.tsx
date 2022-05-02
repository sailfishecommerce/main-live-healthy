import { Formik } from 'formik'

import Breadcrumb from '@/components/Breadcrumb'
import DeliveryAddress from '@/components/Checkout/DeliveryAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import ReviewOrder from '@/components/Checkout/ReviewOrder'
import { checkoutFormSchema } from '@/components/Form/schema/CheckoutFormSchema'
import { useAppDispatch } from '@/hooks/useRedux'
import useShippingPayment from '@/hooks/useShippingPayment'
import breadcrumbContent from '@/json/breadcrumb.json'
import { updateCompleteOrder, updatePaymentForm } from '@/redux/payment-slice'

export default function CheckoutCustomer() {
  const { formValues } = useShippingPayment()
  const dispatch = useAppDispatch()
  return (
    <div className="w-full bg-gray-100 mx-auto p-4 pb-8">
      <div className="container flex flex-col mx-auto">
        <Breadcrumb breadcrumbItems={breadcrumbContent.checkout} />
        <div className="content lg:grid lg:grid-cols-3 lg:gap-5 flex flex-col  w-full">
          <ReviewOrder />
          <Formik
            enableReinitialize
            initialValues={formValues}
            validationSchema={checkoutFormSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(updatePaymentForm({ form: values, completed: true }))
              setSubmitting(false)
              dispatch(updateCompleteOrder(true))
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
        </div>
      </div>
    </div>
  )
}
