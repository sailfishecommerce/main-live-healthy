import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { displayFormElement } from '@/components/Form/FormElement'
import { forgotPasswordSchema } from '@/components/Form/schema/AuthSchema'
import { useAccount, useToast } from '@/hooks'
import passwordResetForm from '@/json/password-reset.json'

export default function PasswordResetForm() {
  const router = useRouter()
  const { recoverPassword } = useAccount()
  const { loadingToast, updateToast } = useToast()
  const searchParams = router.query
  const toastID = useRef(null)

  const key: any | string = searchParams.key

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        loadingToast(toastID)
        recoverPassword(values.newPassword, key)
          .then((response) => {
            if (response?.success) {
              updateToast(toastID, 'success', 'Password reset successful')
              router.push('/account')
            } else {
              updateToast(toastID, 'error', 'error resetting password')
            }
          })
          .catch(() =>
            updateToast(toastID, 'error', 'error resetting password')
          )
        resetForm()
        setSubmitting(false)
      }}
    >
      {(formik) => (
        <form
          noValidate
          className="card-body needs-validation"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            {passwordResetForm.reset.map((formInput) => (
              <div className="col-12" key={formInput.name}>
                {displayFormElement(formInput, formik)}
              </div>
            ))}
          </div>
          <button
            aria-label="password reset"
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  )
}
