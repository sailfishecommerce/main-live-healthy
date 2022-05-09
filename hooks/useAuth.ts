/* eslint-disable unused-imports/no-unused-vars */
import { useMutation, useQueryClient } from 'react-query'

import useAccount from '@/hooks/useAccount'

export default function useAuth() {
  const { loginUser, logoutUser, createUserAccount } = useAccount()
  const queryClient = useQueryClient()

  function useSignIn() {
    return useMutation(
      ({ email, password }: { email: string; password: string }) =>
        loginUser({ email, password }),
      {
        onSettled: () => {
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('userdetails')
        },
      }
    )
  }

  function useLogout() {
    return useMutation(() => logoutUser(), {
      onSettled: () => {
        queryClient.invalidateQueries('cart')
        queryClient.invalidateQueries('userdetails')
      },
    })
  }

  return {
    useSignIn,
    useLogout,
  }
}
