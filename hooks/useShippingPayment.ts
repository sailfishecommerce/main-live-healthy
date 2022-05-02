/* eslint-disable no-nested-ternary */
import { useQuery } from 'react-query'

import { useAppSelector } from './useRedux'

import { useAccount } from '.'

export default function useShippingPayment() {
  const { getUserAccount } = useAccount()
  const { data: userDetail, status } = useQuery('userdetails', getUserAccount)
  const { paymentForm }: any = useAppSelector((state) => state.payment)

  function formatFormValues(field: string) {
    const formValue =
      status === 'error'
        ? ''
        : status === 'loading'
        ? ''
        : userDetail !== null
        ? userDetail[field]
        : paymentForm !== null
        ? paymentForm[field]
        : ''

    return formValue
  }

  function formatFieldValue(field: string) {
    const formValue = paymentForm ? paymentForm[field] : ''
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
