import { useAtom } from 'jotai'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useAccount from '@/hooks/useAccount'
import useToast from '@/hooks/useToast'
import { modalAtom } from '@/lib/atomConfig'

type signIn = { email: string; password: string }
type signUp = signIn & { firstName: string; lastName: string }

export default function useAuth() {
  const { loadingToast, updateToast } = useToast()
  const { loginUser, logoutUser, createUserAccount } = useAccount()
  const queryClient = useQueryClient()
  const [, setModal] = useAtom(modalAtom)

  function useSignIn() {
    const toastID = useRef(null)

    return useMutation(
      ({ email, password }: signIn) => loginUser({ email, password }),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('userDetails')
        },
        onSuccess: (response) => {
          if (response !== null) {
            updateToast(
              toastID,
              toast.TYPE.SUCCESS,
              `login successful, welcome ${response.name}`
            )
            setModal(null)
          } else {
            toast.error('login failed')
            updateToast(toastID, toast.TYPE.ERROR, 'login failed')
          }
        },
      }
    )
  }

  function useSignUp() {
    const toastID = useRef(null)

    return useMutation(
      (formValues: signUp) => createUserAccount(formValues),

      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('userDetails')
        },
        onSuccess: (response) => {
          if (response?.name) {
            updateToast(
              toastID,
              toast.TYPE.SUCCESS,
              `Sign up successful, welcome ${response.name}`
            )
            setModal(null)
          } else {
            updateToast(
              toastID,
              toast.TYPE.ERROR,
              `Sign up failed, User ${response?.email.message}`
            )
          }
        },
        onError: () => {
          updateToast(toastID, toast.TYPE.ERROR, 'Sign up failed')
        },
      }
    )
  }

  function useLogout() {
    const toastID = useRef(null)

    return useMutation(() => logoutUser(), {
      onSettled: () => {
        queryClient.invalidateQueries('cart')
        queryClient.invalidateQueries('userDetails')
      },
      onMutate: () => {
        loadingToast(toastID)
      },
      onSuccess: (response) => {
        if (response?.success) {
          updateToast(toastID, toast.TYPE.SUCCESS, 'Logout successful')
          setModal(null)
        }
      },
      onError: () => {
        updateToast(toastID, toast.TYPE.ERROR, 'unable to logout user')
      },
    })
  }

  return {
    useSignIn,
    useLogout,
    useSignUp,
  }
}
