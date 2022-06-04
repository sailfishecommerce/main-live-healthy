/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import { paymentFormAtom } from '@/lib/atomConfig'

type fieldType =
  | 'address'
  | 'country'
  | 'district'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'region'
  | 'zip'

export default function useShippingPayment() {
  const { getUserAccount } = useAccount()
  const { data: userDetail, status } = useQuery('userDetails', getUserAccount)
  const [paymentForm] = useAtom(paymentFormAtom)

  function formatFormValues(field: fieldType) {
    const formValue =
      status === 'error'
        ? ''
        : status === 'loading'
        ? ''
        : userDetail !== null
        ? userDetail[field]
        : paymentForm !== null
        ? paymentForm.form[field]
        : ''

    return formValue
  }

  function formatFieldValue(field: fieldType) {
    const formValue = paymentForm ? paymentForm.form[field] : ''
    return formValue
  }

  const formValues = {
    firstName: formatFormValues('firstName'),
    lastName: formatFormValues('lastName'),
    email: formatFormValues('email'),
    country: formatFieldValue('country'),
    address: formatFieldValue('address'),
    region: formatFieldValue('region'),
    district: formatFieldValue('district'),
    zip: formatFieldValue('zip'),
    phone: formatFieldValue('phone'),
  }

  return {
    formValues,
  }
}
