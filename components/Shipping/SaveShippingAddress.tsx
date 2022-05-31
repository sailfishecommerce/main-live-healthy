/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import AccountDetailsFormContent from '@/json/account-details-form.json'

export default function SaveShippingAddress() {
  return (
    <div className="shipping-address my-6">
      <h3 className="text-xl font-medium my-4">Shipping / Billing Address</h3>
      <Formik
        initialValues={{ address: '', city: '', country: '' }}
        onSubmit={(values) => console.log('values', values)}
      >
        {(formik) => (
          <form>
            {AccountDetailsFormContent.ShippingAddress.map((content, index) => (
              <div key={index}>{displayFormElement(content, formik)}</div>
            ))}
            <button
              aria-label="save info"
              type="button"
              className="hover-mountain-green border hover:text-white font-bold rounded-xl w-full p-3 mt-2"
            >
              Save account Information
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
