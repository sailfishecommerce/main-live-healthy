import { useQueryClient } from 'react-query'

export default function useDisplayUserDetails() {
  const queryClient = useQueryClient()
  const userDetails = queryClient.getQueryData('getAccount')
  return userDetails
}
