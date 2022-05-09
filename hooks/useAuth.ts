import useAccount from '@/hooks/useAccount'
import useToast from '@/hooks/useToast'
import { addNewUserToList } from '@/hooks/useVbout'

export default function useAuth() {
  const { isLoading, isSuccessful, hasError } = useToast()
  const { loginUser, logoutUser, createUserAccount } = useAccount()

  function signIn(values: any, formik: any) {
    const toastId = isLoading()
    loginUser(values)
      .then((response) => {
        if (response) {
          isSuccessful(toastId, `Welcome back, ${values.email}`)
          formik.resetForm()
          formik.setSubmitting(false)
          // dispatch(authorizeUser(response))
          if (response !== null) {
            // dispatch(toggleAuthModal())
          }
        } else {
          hasError(toastId, 'login not successful')
          formik.setSubmitting(false)
        }
      })
      .catch((error) => {
        hasError(toastId, error?.message)
        // dispatch(authorizeError())
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
          // dispatch(authorizeUser(response))
          formik.resetForm()
          if (!notModal) {
            // dispatch(toggleAuthModal())
          }
        }
        formik.setSubmitting(false)
      })
      .catch((error) => {
        hasError(toastId, error?.message)
        // dispatch(authorizeError())
        formik.setSubmitting(false)
      })
  }

  function userLogout() {
    const toastId = isLoading()
    logoutUser()
      .then((response) => {
        if (response?.success) {
          // dispatch(logout())
          isSuccessful(toastId, 'logout successful')
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
