/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Formik } from 'formik'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { displayFormElement } from '@/components/Form/FormElement'
import { signinFormSchema } from '@/components/Form/schema/AuthSchema'
// import { useAuth } from '@/hooks'
import useAuthTemp from '@/hooks/useAuthTemp'
import authContent from '@/json/authForm.json'
import { modalAtom } from '@/lib/atomConfig'

export default function SigninForm() {
  // const { signIn } = useAuth()
  const { useSignIn } = useAuthTemp()
  const signIn = useSignIn()
  const [, setModal]: any = useAtom<'SLIDING-CART' | null>(modalAtom)

  function toggleAuthmodal() {
    return setModal(null)
  }

  if (signIn.isSuccess) {
    if (signIn.data) {
      toast.success(`sign in successful,Welcome ${signIn.data.name}`)
    }
    toggleAuthmodal()
  } else if (signIn.isError) {
    toast.error('sign in error')
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signinFormSchema}
      onSubmit={(values) => {
        signIn.mutate({ email: values.email, password: values.password })
      }}
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
            <div key={content.name} className="flex flex-col w-100">
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
