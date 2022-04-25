import { useQueryClient } from 'react-query'

import useAccount from '@/hooks/useAccount'
import { useAppDispatch } from '@/hooks/useRedux'
import useToast from '@/hooks/useToast'
import { addNewUserToList } from '@/hooks/useVbout'
import { authorizeError, authorizeUser, logout } from '@/redux/auth-slice'
import { toggleAuthModal } from '@/redux/ui-slice'

export default function useAuth() {
  const { isLoading, isSuccessful, hasError } = useToast()
  const { loginUser, signedUserDetails, createUserAccount } = useAccount()
  const dispatch = useAppDispatch()

  function useSignIn() {
    const toastId = isLoading()
    const queryClient = useQueryClient()

    function userLogin(values: any, formik: any, notModal?: boolean) {
      return loginUser(values)
        .then((response) => {
          if (response) {
            isSuccessful(toastId, `Welcome back, ${values.email}`)
            formik.resetForm()
            formik.setSubmitting(false)
            dispatch(authorizeUser(response))
            queryClient.invalidateQueries('userdetails')
            queryClient.invalidateQueries('cart')
            if (!notModal) {
              dispatch(toggleAuthModal())
            }
          } else {
            hasError(toastId, 'login not successful')
            formik.setSubmitting(false)
          }
        })
        .catch((error) => {
          hasError(toastId, error?.message)
          dispatch(authorizeError())
          formik.setSubmitting(false)
        })
    }
    return { userLogin }
  }

  function useSignUp() {
    const queryClient = useQueryClient()
    const toastId = isLoading()

    function userSignup(values: any, formik: any, notModal?: boolean) {
      addNewUserToList(values.email)
      createUserAccount(values)
        .then((response) => {
          if (response?.email.code === 'UNIQUE') {
            hasError(toastId, `${values.email} already exists `)
          } else {
            isSuccessful(toastId, `${values.email}, sign up successful`)
            dispatch(authorizeUser(response))
            formik.resetForm()
            queryClient.invalidateQueries('userdetails')
            if (!notModal) {
              dispatch(toggleAuthModal())
            }
          }
          formik.setSubmitting(false)
        })
        .catch((error) => {
          hasError(toastId, error?.message)
          dispatch(authorizeError())
          formik.setSubmitting(false)
        })
    }
    return { userSignup }
  }

  async function getUserDetails() {
    return await signedUserDetails()
  }

  return {
    useSignIn,
    useSignUp,
    useLogout,
    getUserDetails,
  }
}

export function useLogout() {
  const { logoutUser } = useAccount()
  const { isLoading, isSuccessful, hasError } = useToast()
  // const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  function userLogout() {
    const toastId = isLoading()
    return logoutUser()
      .then((response) => {
        if (response?.success) {
          dispatch(logout())
          isSuccessful(toastId, 'logout successful')
          // queryClient.invalidateQueries('userdetails')
          // queryClient.invalidateQueries('cart')
        } else {
          hasError(toastId, 'unable to logout user')
        }
      })
      .catch((err) => {
        hasError(toastId, err?.message)
      })
  }
  return { userLogout }
}
