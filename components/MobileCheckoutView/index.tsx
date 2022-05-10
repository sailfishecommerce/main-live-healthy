import { Formik } from 'formik'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { checkoutFormSchema } from '@/components/Form/schema/CheckoutFormSchema'
import CheckoutStepButtonGroup from '@/components/MobileCheckoutView/CheckoutStepButtonGroup'
import displayCheckoutView from '@/components/MobileCheckoutView/displayCheckoutView'
import useShippingPayment from '@/hooks/useShippingPayment'
import { completeOrderAtom, paymentFormAtom } from '@/lib/atomConfig'

export default function MobileCheckoutView() {
  const [checkoutSteps, setCheckoutSteps] = useState(0)
  const { formValues } = useShippingPayment()
  const [, setPaymentForm] = useAtom(paymentFormAtom)
  const [, setCompleteOrder] = useAtom(completeOrderAtom)

  const stepHandler = (stepType: 'next' | 'prev') => {
    if (checkoutSteps <= 3 && stepType === 'next') {
      setCheckoutSteps((prevState) => prevState + 1)
    } else if (stepType === 'prev' && checkoutSteps <= 3 && checkoutSteps > 0) {
      setCheckoutSteps((prevState) => prevState - 1)
    }
  }

  return (
    <div>
      <div className="content" data-aos="fade-up" data-aos-duration="3000">
        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={checkoutFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            setPaymentForm({ form: values, completed: true })
            setSubmitting(false)
            setCompleteOrder(true)
          }}
        >
          {(formik) => {
            return <form>{displayCheckoutView(checkoutSteps, formik)}</form>
          }}
        </Formik>
      </div>
      <CheckoutStepButtonGroup
        checkoutSteps={checkoutSteps}
        onClick={stepHandler}
      />
    </div>
  )
}
