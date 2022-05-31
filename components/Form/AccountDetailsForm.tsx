/* eslint-disable no-console */
import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { accountDetailsSchema } from '@/components/Form/schema/AccountDetailsSchema'
import useUpdateAccountdetails from '@/hooks/useUpdateAccountdetails'
import AccountformContent from '@/json/account-details-form.json'

export default function AccountDetailsForm() {
  const { formInitialData } = useUpdateAccountdetails()
  return (
    <Formik
      initialValues={formInitialData}
      validationSchema={accountDetailsSchema}
      onSubmit={(values) => console.log('values', values)}
    >
      {(formik) => (
        <form className="account-details-form my-4">
          <div className="content flex flex-col">
            {AccountformContent.AccountDetails.map((content) => (
              <div key={content.name}>
                {displayFormElement(content, formik)}
              </div>
            ))}
            <button
              type="button"
              className="bg-mountain-green w-full p-3 text-white font-bold rounded-xl"
            >
              Save account Information
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}
