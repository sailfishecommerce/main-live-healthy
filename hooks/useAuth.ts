import { useQueryClient } from 'react-query'

import useAccount from '@/hooks/useAccount'
import { useAppDispatch } from '@/hooks/useRedux'
import useToast from '@/hooks/useToast'
import { addNewUserToList } from '@/hooks/useVbout'
import { authorizeError, authorizeUser, logout } from '@/redux/auth-slice'
import { toggleAuthModal } from '@/redux/ui-slice'

export default function useAuth() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { isLoading, isSuccessful, hasError } = useToast()
  const { loginUser, logoutUser, createUserAccount } = useAccount()

  function signIn(values: any, formik: any, notModal?: boolean) {
    const toastId = isLoading()
    loginUser(values)
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
          } else {
            hasError(toastId, 'login not successful')
            formik.setSubmitting(false)
          }
        }
      })
      .catch((error) => {
        hasError(toastId, error?.message)
        dispatch(authorizeError())
        formik.setSubmitting(false)
      })
  }

  function signUp(values: any, formik: any, notModal?: boolean) {
    const toastId = isLoading()
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

  function userLogout() {
    const toastId = isLoading()
    logoutUser()
      .then((response) => {
        if (response?.success) {
          dispatch(logout())
          isSuccessful(toastId, 'logout successful')
          queryClient.invalidateQueries('userdetails')
          queryClient.invalidateQueries('cart')
        } else {
          hasError(toastId, 'unable to logout user')
        }
      })
      .catch((err) => {
        hasError(toastId, err?.message)
      })
  }

  return {
    signIn,
    signUp,
    userLogout,
  }
}
