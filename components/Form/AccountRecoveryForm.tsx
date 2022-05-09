import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { displayFormElement } from '@/components/Form/FormElement'
import { passwordRecoverySchema } from '@/components/Form/schema/AuthSchema'
import { useAccount } from '@/hooks'
import passwordResetForm from '@/json/password-reset.json'

export default function AccountRecoveryform() {
  const { forgotPassword } = useAccount()

  return (
    <div className="card py-2 mt-4">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={passwordRecoverySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          forgotPassword(values.email)
            .then(() => {
              toast.success(`A reset link has been sent to ${values.email}`)
              resetForm()
            })
            .catch(() => {
              toast.error('error sending reset link to your mail')
              resetForm()
            })
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <form
            noValidate
            className="card-body needs-validation"
            onSubmit={formik.handleSubmit}
          >
            {passwordResetForm.recover.map((formInput) => (
              <div key={formInput.name} className="col-12">
                {displayFormElement(formInput, formik)}
              </div>
            ))}
            <button
              aria-label="get new password"
              disabled={formik.isSubmitting}
              className="bg-mountain-green px-3 py-2 rounded-lg text-white font-semibold"
              type="submit"
            >
              Get new password
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
