/* eslint-disable no-console */
import { Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { displayFormElement } from '@/components/Form/FormElement'
import { forgotPasswordSchema } from '@/components/Form/schema/AuthSchema'
import { useAccount, useToast } from '@/hooks'
import passwordResetForm from '@/json/password-reset.json'

export default function PasswordReset() {
  const router = useRouter()
  const { recoverPassword } = useAccount()
  const { isLoading, isSuccessful, hasError } = useToast()
  const searchParams = router.query
  const key: any | string = searchParams.key

  return (
    <div className="container flex flex-col lg:flex-row items-center mx-auto py-4 py-lg-5 my-4">
      <div className="row lg:w-1/2 w-full justify-center">
        <div className="text-content">
          <h2 className="h3 mb-4">Forgot your password?</h2>
          <p className="fs-md">
            Reset your password, ensure to fill details appropriately
          </p>
          <div className="card py-2 mt-4">
            <Formik
              initialValues={{
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={forgotPasswordSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const loading = isLoading()
                recoverPassword(values.newPassword, key)
                  .then((response) => {
                    if (response?.success) {
                      isSuccessful(loading, 'Password reset successful')
                      router.push('/account')
                    } else {
                      hasError(loading, 'error resetting password')
                    }
                  })
                  .catch((err) => {
                    console.log('error', err)
                    hasError(loading, 'error resetting password')
                  })
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
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full image-wrapper">
        <Image
          src="/forgotPassword.webp"
          alt="forgot password"
          height={500}
          width={700}
        />
      </div>
    </div>
  )
}
