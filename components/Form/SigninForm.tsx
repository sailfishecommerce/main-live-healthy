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
  const { signIn } = useAuth()
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
      onSubmit={(values, formik) => signIn(values, formik)}
    >
      {(formik) => (
        <form
          noValidate
          className="w-full"
          autoComplete="off"
          id="signin-tab"
          onSubmit={formik.handleSubmit}
        >
          {authContent.signIn.map((content, index) => (
            <div key={index} className="flex flex-col w-100">
              {displayFormElement(content, formik)}
            </div>
          ))}
          <div className="mb-3 flex flex-wrap justify-between">
            <Link passHref href="/account-recovery">
              <a
                title="Forgot password"
                className="fs-sm mountain-green"
                onClick={toggleAuthmodal}
              >
                Forgot password?
              </a>
            </Link>
          </div>
          <button
            aria-label="Sign in"
            className="bg-mountain-green mx-auto rounded-md text-white px-3 py-2 flex"
            type="submit"
            title="Sign in"
          >
            Login
          </button>
        </form>
      )}
    </Formik>
  )
}
