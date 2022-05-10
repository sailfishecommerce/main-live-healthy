import { Formik } from 'formik'

import { mapContent } from '@/components/Form/ContactForMoreForm'
import { signupFormSchema } from '@/components/Form/schema/AuthSchema'
import { useAuth } from '@/hooks'
import formContent from '@/json/AccountAuthform.json'

export default function AccountSignupForm() {
  const { useSignUp } = useAuth()
  const signUp = useSignUp()

  return (
    <div className="col-md-6 pt-4 mt-3 mt-md-0">
      <h2 className="h4 mb-3">No account? Sign up</h2>
      <p className="fs-sm text-gray-500 mb-4">
        Registration takes less than a minute but gives you full control over
        your orders.
      </p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signupFormSchema}
        onSubmit={(values) => signUp.mutate(values)}
      >
        {(formik) => (
          <form
            noValidate
            className="needs-validation"
            onSubmit={formik.handleSubmit}
          >
            {formContent.signup.map((content: any) => (
              <div className="row" key={content.id}>
                {content.length === 2
                  ? mapContent(content, 'col-sm-6', formik)
                  : content.length === 1 &&
                    mapContent(content, 'col-sm-12', formik)}
              </div>
            ))}
            <div className="col-12 text-end">
              <button
                aria-label="submit signup form"
                className="btn btn-primary"
                type="submit"
              >
                <i className="ci-user mx-2 ms-n1"></i>
                Sign Up
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
