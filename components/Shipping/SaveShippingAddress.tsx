/* eslint-disable react/no-array-index-key */
import { Formik } from 'formik'
import { useQuery } from 'react-query'

import { displayFormElement } from '@/components/Form/FormElement'
import { shippingDetailsSchema } from '@/components/Form/schema/AccountDetailsSchema'
import { useAccount } from '@/hooks'
import useMutationAction from '@/hooks/useMutationAction'
import useUpdateAccountdetails from '@/hooks/useUpdateAccountdetails'
import AccountDetailsFormContent from '@/json/account-details-form.json'

export default function SaveShippingAddress() {
  const { getUserAccount } = useAccount()
  const { data } = useQuery('userDetails', getUserAccount)
  const { shippingInitialData } = useUpdateAccountdetails()

  const { useUserAccountDetails } = useMutationAction()
  const { updateUserShippingDetails } = useUpdateAccountdetails()

  const mutateUserAccount = useUserAccountDetails(updateUserShippingDetails)

  return (
    <div className="shipping-address my-6">
      <h3 className="text-xl font-medium my-4">Shipping / Billing Address</h3>
      <Formik
        validationSchema={shippingDetailsSchema}
        initialValues={shippingInitialData}
        onSubmit={(values) => {
          const userDetails = {
            id: data?.id,
            shipping: {
              ...values,
            },
          }
          mutateUserAccount.mutate({ userDetails })
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {AccountDetailsFormContent.ShippingAddress.map((content, index) => (
              <div key={index}>{displayFormElement(content, formik)}</div>
            ))}
            <button
              aria-label="save info"
              type="submit"
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
