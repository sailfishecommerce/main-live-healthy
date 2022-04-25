import { Formik } from 'formik'
import Link from 'next/link'

import { displayFormElement } from '@/components/Form/FormElement'
import { signinFormSchema } from '@/components/Form/schema/AuthSchema'
import SocialIcons from '@/components/Icons/SocialIcons'
import { useAuth } from '@/hooks'
import formContent from '@/json/AccountAuthform.json'

export default function AccountSigninForm() {
  const { useSignIn } = useAuth()
  const { userLogin } = useSignIn()
  return (
    <div className="col-md-6">
      <div className="card border-0 shadow">
        <div className="card-body">
          <h2 className="h4 mb-1">Sign in</h2>
          <div className="py-3">
            <h3 className="d-inline-block align-middle fs-base fw-medium mb-2 mx-2">
              With social account:
            </h3>
            <SocialIcons />
          </div>
          <hr />
          <h3 className="fs-base pt-4 pb-2">Or using form below</h3>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={signinFormSchema}
            onSubmit={(values, formik) => userLogin(values, formik, true)}
          >
            {(formik) => (
              <form
                noValidate
                className="needs-validation"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                {formContent.signin.map((content) => (
                  <div key={content.id} className="row">
                    {displayFormElement(content, formik)}
                  </div>
                ))}
                <div className="flex flex-wrap justify-between">
                  <div className="form-check">
                    <input
                      checked
                      className="form-check-input"
                      type="checkbox"
                      id="remember_me"
                    />
                    <label className="form-check-label" htmlFor="remember_me">
                      Remember me
                    </label>
                  </div>
                  <Link passHref href="/account-password-recovery">
                    <a
                      aria-label="forgot password?"
                      className="nav-link-inline fs-sm"
                    >
                      Forgot password?
                    </a>
                  </Link>
                </div>
                <hr className="mt-4" />
                <div className="text-end pt-4">
                  <button
                    aria-label="submit-form"
                    className="btn btn-primary"
                    type="submit"
                  >
                    <i className="ci-sign-in mx-2 ms-n21"></i>
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
