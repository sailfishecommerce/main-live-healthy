import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'

export default function useGreetuser() {
  const { getUserAccount } = useAccount()

  const { data: userDetails } = useQuery('userDetails', getUserAccount, {
    staleTime: Infinity,
  })

  const name = userDetails?.name

  return {
    name,
    userDetails,
  }
}
