import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { contactFormSchema } from '@/components/Form/schema/ContactFormSchema'
import useVboutMutation from '@/hooks/useVboutMutation'
import contactFormData from '@/json/contact-us-form.json'

export default function ContactForm() {
  const { useContactForm } = useVboutMutation()
  const contactusForm = useContactForm()
  return (
    <div className="w-full md:w-1/2 justify-center mx-auto px-4 xl:px-5 py-5 border mb-8">
      <h2 className="text-xl mb-4">Drop us a line</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        }}
        validationSchema={contactFormSchema}
        onSubmit={(values, { resetForm }) => {
          const { email, name, phone, subject, message } = values
          contactusForm.mutate({ name, email, phone, subject, message })
          resetForm()
        }}
      >
        {(formik: any) => (
          <form
            className="needs-validation mb-3"
            id="contact-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-wrap">
              {contactFormData.map((input) => {
                const inputclassName =
                  input.type === 'input'
                    ? 'w-1/2 contact-input flex flex-col items-start px-2'
                    : 'w-full contact-textarea flex flex-col items px-2'

                return (
                  <div key={input.id} className={inputclassName}>
                    {displayFormElement(input, formik)}
                  </div>
                )
              })}
              <button
                aria-label="Send Message"
                className="border-2 bg-red-500 text-white w-32 p-1 px-2 rounded-md hover:border-red-500 hover:bg-white hover:text-red-500 mt-4"
                type="submit"
              >
                Send message
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
