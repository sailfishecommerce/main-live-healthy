import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { adminSigninFormSchema } from '@/components/Form/schema/AuthSchema'
import useAuthMutation from '@/hooks/useAuthMutation'
import formContent from '@/json/admin-login-form.json'

export default function AdminLogin() {
  const { useAdminSignin } = useAuthMutation()
  const adminSignin = useAdminSignin()
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={adminSigninFormSchema}
      onSubmit={({ email, password }) =>
        adminSignin.mutate({ email, password })
      }
    >
      {(formik) => (
        <form
          noValidate
          autoComplete="off"
          id="signup-tab"
          className="flex flex-col items-center shadow-lg py-8 p-4 justify-between mx-auto mt-12 w-11/12  bg-white rounded-xl"
          onSubmit={formik.handleSubmit}
        >
          {formContent.map((content: any) => (
            <div key={content.id} className="flex flex-col w-full">
              {displayFormElement(content, formik)}
            </div>
          ))}
          <button
            aria-label="Sign up"
            className="bg-mountain-green mx-auto rounded-md text-white px-3 py-2 flex"
            type="submit"
            title="Sign up"
          >
            Sign up
          </button>
        </form>
      )}
    </Formik>
  )
}
