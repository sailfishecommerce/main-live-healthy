import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { signupFormSchema } from '@/components/Form/schema/AuthSchema'
import { useAuth } from '@/hooks'
import authContent from '@/json/authForm.json'

export default function SignupForm() {
  const { useSignUp } = useAuth()
  const { userSignup } = useSignUp()
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
      onSubmit={(values, formik) => userSignup(values, formik)}
    >
      {(formik) => (
        <form
          noValidate
          className="w-full"
          autoComplete="off"
          id="signup-tab"
          onSubmit={formik.handleSubmit}
        >
          {authContent.signUp.map((content: any) => {
            return content?.length ? (
              <div key={content.name} className="flex flex-wrap">
                {content.map((inputContent: any) => (
                  <div key={inputContent} className="w-full tablet:w-1/2">
                    {displayFormElement(inputContent, formik)}
                  </div>
                ))}
              </div>
            ) : (
              <div key={content.name} className="flex flex-col">
                {displayFormElement(content, formik)}
              </div>
            )
          })}
          <button
            aria-label="Sign up"
            className="bg-red-500 hover:bg-red-400  mx-auto rounded-md text-white p-2 shadow-lg flex justify-center"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Sign up
          </button>
        </form>
      )}
    </Formik>
  )
}
