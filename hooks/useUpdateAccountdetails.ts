import axios from 'axios'
import { useQuery } from 'react-query'

import useAccount from '@/hooks/useAccount'

export default function useUpdateAccountdetails() {
  const { getUserAccount } = useAccount()
  const { data, status } = useQuery('userDetails', getUserAccount)

  const formInitialData = {
    firstName: '',
    lastName: '',
    userEmail: '',
  }
  const shippingInitialData = {
    address1: '',
    address2: '',
    city: '',
    phone: '',
    zip: '',
    state: '',
    country: '',
  }
  if (status === 'success') {
    formInitialData.firstName = data.firstName ? data.firstName : ''
    formInitialData.lastName = data.lastName ? data.lastName : ''
    formInitialData.userEmail = data.email ? data.email : ''

    shippingInitialData.address1 = data.shipping.address1
      ? data.shipping.address1
      : ''
    shippingInitialData.address2 = data.shipping.address2
      ? data.shipping.address2
      : ''
    shippingInitialData.city = data.shipping.city ? data.shipping.city : ''
    shippingInitialData.state = data.shipping.state ? data.shipping.state : ''
    shippingInitialData.zip = data.shipping.zip ? data.shipping.zip : ''
    shippingInitialData.phone = data.shipping.phone ? data.shipping.phone : ''
  }

  function updateUserAccountDetails(userDetails: any) {
    return axios.put('/api/update-user-account', userDetails)
  }

  function updateUserShippingDetails(userDetails: any) {
    return axios.put('/api/update-user-shipping-details', userDetails)
  }

  return {
    formInitialData,
    shippingInitialData,
    updateUserAccountDetails,
    updateUserShippingDetails,
  }
}
