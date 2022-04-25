/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik } from 'formik'
import Link from 'next/link'

import { displayFormElement } from '@/components/Form/FormElement'
import { signinFormSchema } from '@/components/Form/schema/AuthSchema'
import { useAuth } from '@/hooks'
import { useAppDispatch } from '@/hooks/useRedux'
import authContent from '@/json/authForm.json'
import { toggleAuthModal } from '@/redux/ui-slice'

export default function SigninForm() {
  const { useSignIn } = useAuth()
  const { userLogin } = useSignIn()
  const dispatch = useAppDispatch()

  function toggleAuthmodal() {
    dispatch(toggleAuthModal())
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signinFormSchema}
      onSubmit={(values, formik) => userLogin(values, formik)}
    >
      {(formik) => (
        <form
          noValidate
          className="w-full"
          autoComplete="off"
          id="signin-tab"
          onSubmit={formik.handleSubmit}
        >
          {authContent.signIn.map((content) => (
            <div key={content.id} className="flex flex-col w-100">
              {displayFormElement(content, formik)}
            </div>
          ))}
          <div className="mb-3 flex flex-wrap justify-between">
            <Link passHref href="/account-password-recovery">
              <a
                aria-label="forgot password?"
                className="fs-sm text-red-500"
                onClick={toggleAuthmodal}
              >
                Forgot password?
              </a>
            </Link>
          </div>
          <button
            aria-label="Sign in"
            className="bg-red-500 mx-auto rounded-md hover:bg-red-400 text-white px-3 py-2 flex"
            type="submit"
          >
            Sign in
          </button>
        </form>
      )}
    </Formik>
  )
}
