/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable unused-imports/no-unused-vars */
import { Formik } from 'formik'

import Accordion from '@/components/Accordion'
import { displayFormElement } from '@/components/Form/FormElement'
import { AddressInputGroup } from '@/components/Form/FormFields'
import { checkoutFormSchema } from '@/components/Form/schema/CheckoutFormSchema'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import useShippingPayment from '@/hooks/useShippingPayment'
import checkoutFormContent from '@/json/checkout-form.json'
import { accordionButtonStyle } from '@/lib/single-Checkout'
import { updateFormStage, updatePaymentForm } from '@/redux/payment-slice'

export default function ShippingCheckoutForm(): JSX.Element {
  const { stage }: any = useAppSelector((state) => state.payment)
  const accordion = accordionButtonStyle(stage)
  const { formValues } = useShippingPayment()
  const dispatch = useAppDispatch()

  return (
    <Accordion stage={1} title="Shipping Address" isOpen={true}>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={checkoutFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(updateFormStage(2))
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
                      <div key={index} className="w-full lg:w-1/2">
                        {displayFormElement(formInput, formik)}
                      </div>
                    ))}
                  </div>
                )
              )}
              <AddressInputGroup formik={formik} />
            </div>
            <button
              aria-label="proceed with shipping"
              type="submit"
              disabled={formik.isSubmitting}
              className="flex border-2 mb-4 border-red-500 hover:bg-red-500 text-red-500 hover:text-white rounded-md px-2 py-1 mx-auto font-bold"
            >
              Proceed
            </button>
          </form>
        )}
      </Formik>
    </Accordion>
  )
}
