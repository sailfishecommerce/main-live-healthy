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
  if (status === 'success') {
    formInitialData.firstName = data.firstName
    formInitialData.lastName = data.lastName
    formInitialData.userEmail = data.email
  }

  function updateUserAccountDetails(userDetails: any) {
    return axios.put('/api/update-user-account', userDetails)
  }

  return { formInitialData, updateUserAccountDetails }
}
