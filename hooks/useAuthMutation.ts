/* eslint-disable no-console */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useFirebaseEmailPassword from '@/hooks/useFirebaseEmailPassword'
import useToast from '@/hooks/useToast'
import { adminAuthAtom } from '@/lib/atomConfig'

export default function useAuthMutation() {
  const { adminSignup, adminSignin, adminLogout } = useFirebaseEmailPassword()
  const { loadingToast, updateToast } = useToast()
  const router = useRouter()
  const [, setAdminAuth] = useAtom(adminAuthAtom)

  type authType = { email: string; password: string }

  function useAdminSignUp() {
    const toastID = useRef(null)

    return useMutation(
      ({ email, password }: authType) => adminSignup(email, password),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSuccess: (response) => {
          console.log('response', response)
          updateToast(
            toastID,
            toast.TYPE.SUCCESS,
            'Account created successfully'
          )
          setAdminAuth(response.user)
          router.push('/admin')
        },
        onError: (error) => {
          console.log('error', error)
          updateToast(toastID, toast.TYPE.ERROR, 'an error occured')
        },
      }
    )
  }

  function useAdminSignin() {
    const toastID = useRef(null)

    return useMutation(
      ({ email, password }: authType) => adminSignin(email, password),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSuccess: (response) => {
          console.log('response', response)
          updateToast(
            toastID,
            toast.TYPE.SUCCESS,
            'Account signin successfully'
          )
          setAdminAuth(response.user)
          router.push('/admin')
        },
        onError: (error) => {
          console.log('error', error)
          updateToast(toastID, toast.TYPE.ERROR, 'an error occured')
        },
      }
    )
  }

  function useAdminLogout() {
    const toastID = useRef(null)

    return useMutation(adminLogout, {
      onMutate: () => {
        loadingToast(toastID)
      },
      onSuccess: (response) => {
        console.log('response', response)
        updateToast(toastID, toast.TYPE.SUCCESS, 'Admin logout successful')
        setAdminAuth(null)
        router.push('/admin/login')
      },
      onError: (error) => {
        console.log('error', error)
        updateToast(toastID, toast.TYPE.ERROR, 'an error occured')
      },
    })
  }

  return {
    useAdminSignUp,
    useAdminSignin,
    useAdminLogout,
  }
}
