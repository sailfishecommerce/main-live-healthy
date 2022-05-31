/* eslint-disable react/no-array-index-key */
import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { signupFormSchema } from '@/components/Form/schema/AuthSchema'
import useAuth from '@/hooks/useAuth'
import authContent from '@/json/authForm.json'

export default function SignupForm() {
  const { useSignUp } = useAuth()
  const signUp = useSignUp()

  return (
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
        <form className="w-full" id="signup-tab" onSubmit={formik.handleSubmit}>
          {authContent.signUp.map((content: any) => {
            return content?.length ? (
              <div key={content.id} className="flex flex-wrap">
                {content.map((inputContent: any, index: number) => (
                  <div key={index} className="w-full md:w-1/2">
                    {displayFormElement(inputContent, formik)}
                  </div>
                ))}
              </div>
            ) : (
              <div key={content.id} className="flex flex-col">
                {displayFormElement(content, formik)}
              </div>
            )
          })}
          <button
            aria-label="Sign up"
            className="bg-mountain-green mx-auto rounded-md text-white px-3 py-2 flex"
            type="submit"
            title="Sign up"
            disabled={formik.isSubmitting}
          >
            Sign up
          </button>
        </form>
      )}
    </Formik>
  )
}
