import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { AddressInputGroup } from '@/components/Form/FormFields'
import { checkoutFormSchema } from '@/components/Form/schema/CheckoutFormSchema'
import { useAppDispatch } from '@/hooks/useRedux'
import useShippingPayment from '@/hooks/useShippingPayment'
import checkoutFormContent from '@/json/checkout-form.json'
import { updatePaymentForm } from '@/redux/payment-slice'

export default function DeliveryAddress() {
  const { formValues } = useShippingPayment()
  const dispatch = useAppDispatch()

  return (
    <div className="w-full bg-white h-fullx md:w-1/2 lg:w-1/3 p-4 mx-4 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">2. Specify Details</h3>
      <p className="mb-4 text-sm">All fields required</p>

      <div className="delivery-form">
        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={checkoutFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            dispatch(updatePaymentForm({ form: values, completed: true }))
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                {checkoutFormContent.personalDetails.content.map(
                  (formRow, index) => (
                    <div key={index} className="flex flex-wrap">
                      {formRow.map((formInput, index) => (
                        <div key={index} className="w-full">
                          {displayFormElement(formInput, formik)}
                        </div>
                      ))}
                    </div>
                  )
                )}
                <AddressInputGroup formik={formik} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
