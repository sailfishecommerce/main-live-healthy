/* eslint-disable unused-imports/no-unused-vars */
import { useAtom } from 'jotai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useAccount from '@/hooks/useAccount'
import { modalAtom } from '@/lib/atomConfig'

type signIn = { email: string; password: string }
type signUp = signIn & { firstName: string; lastName: string }

export default function useAuth() {
  const { loginUser, logoutUser, createUserAccount } = useAccount()
  const queryClient = useQueryClient()
  const [, setModal] = useAtom(modalAtom)

  function useSignIn() {
    return useMutation(
      ({ email, password }: signIn) => loginUser({ email, password }),
      {
        onSettled: () => {
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('userdetails')
        },
        onSuccess: (response) => {
          if (response !== null) {
            toast.success(`login successful, welcome ${response.name}`)
            setModal(null)
          } else {
            toast.error('login failed')
          }
        },
        onError: (error) => {
          toast.error('login failed')
        },
      }
    )
  }

  function useSignUp() {
    return useMutation(
      (formValues: signUp) => createUserAccount(formValues),

      {
        onSettled: () => {
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('userdetails')
        },
        onSuccess: (response) => {
          if (response?.name) {
            console.log('response', response)
            toast.success(`Sign up successful, welcome ${response.name}`)
            setModal(null)
          } else {
            toast.error(`Sign up failed, User ${response?.email.message}`)
          }
        },
        onError: (error) => {
          console.log('error', error)
          toast.error('Sign up failed')
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
      onSuccess: (response) => {
        toast.success('Logout successful')
        setModal(null)
      },
      onError: (error) => {
        console.log('error', error)
        toast.error(`unable to logout user}`)
      },
    })
  }

  return {
    useSignIn,
    useLogout,
    useSignUp,
  }
}

// kwilliams@gmail.com
// kwills2022
