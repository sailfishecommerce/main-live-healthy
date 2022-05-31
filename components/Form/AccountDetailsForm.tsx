/* eslint-disable no-console */
import { Formik } from 'formik'
import { useQuery } from 'react-query'

import { displayFormElement } from '@/components/Form/FormElement'
import { accountDetailsSchema } from '@/components/Form/schema/AccountDetailsSchema'
import { useAccount } from '@/hooks'
import useMutationAction from '@/hooks/useMutationAction'
import useUpdateAccountdetails from '@/hooks/useUpdateAccountdetails'
import AccountformContent from '@/json/account-details-form.json'

export default function AccountDetailsForm() {
  const { getUserAccount } = useAccount()
  const { formInitialData } = useUpdateAccountdetails()
  const { data } = useQuery('userDetails', getUserAccount)
  const { useUserAccountDetails } = useMutationAction()
  const { updateUserAccountDetails } = useUpdateAccountdetails()

  const mutateUserAccount = useUserAccountDetails(updateUserAccountDetails)

  return (
    <Formik
      initialValues={formInitialData}
      validationSchema={accountDetailsSchema}
      onSubmit={(values) => {
        console.log('values', values)
        const userDetails = {
          id: data?.id,
          update: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.userEmail,
          },
        }
        return mutateUserAccount.mutate({ userDetails })
      }}
    >
      {(formik) => (
        <form
          noValidate
          className="account-details-form my-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="content flex flex-col">
            {AccountformContent.AccountDetails.map((content) => (
              <div key={content.name}>
                {displayFormElement(content, formik)}
              </div>
            ))}
            <button
              type="submit"
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
