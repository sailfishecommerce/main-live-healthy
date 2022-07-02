/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import { checkoutAddressAtom } from '@/lib/atomConfig'

type fieldType =
  | 'address1'
  | 'city'
  | 'country'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'state'
  | 'zip'

export default function useShippingPayment() {
  const { getUserAccount } = useAccount()
  const { data: userDetail, status } = useQuery('userDetails', getUserAccount)
  const [checkoutAddress] = useAtom(checkoutAddressAtom)

  function formatFormValues(field: fieldType) {
    const formValue =
      status === 'error'
        ? ''
        : status === 'loading'
        ? ''
        : userDetail !== null
        ? userDetail[field]
        : checkoutAddress !== null
        ? checkoutAddress.shipping[field]
        : ''

    return formValue
  }

  function formatFieldValue(field: fieldType) {
    return checkoutAddress.form[field]
  }

  const formValues = {
    firstName: formatFormValues('firstName'),
    lastName: formatFormValues('lastName'),
    email: formatFormValues('email'),
    country: formatFieldValue('country'),
    address1: formatFieldValue('address1'),
    state: formatFieldValue('state'),
    city: formatFieldValue('city'),
    zip: formatFieldValue('zip'),
    phone: formatFieldValue('phone'),
  }

  return {
    formValues,
  }
}
