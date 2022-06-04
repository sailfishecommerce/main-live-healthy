import { Formik } from 'formik'

import useVboutMutation from '@/hooks/useVboutMutation'

export default function FooterDeals() {
  const { useAddEmailToNewsletter } = useVboutMutation()
  const addEmailToNewsletter = useAddEmailToNewsletter()

  return (
    <div className="flex flex-col w-full md:mb-4 mb-0 order-1 md:w-1/4">
      <h4 className="font-bold mt-4 mb-2 md:mb-6 text-lg lg:text-xl">
        Get deals in your inbox
      </h4>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { resetForm }) => {
          addEmailToNewsletter.mutate({ email: values.email, listid: 70390 })
          resetForm()
        }}
      >
        {(formik) => (
          <form
            className="deal-form flex items-center"
            onSubmit={formik.handleSubmit}
          >
            <input
              required={true}
              placeholder="Enter your e-mail"
              type="email"
              name="email"
              value={formik.values.email}
              className="bg-transparent border-b-2 border-black w-full"
              onChange={formik.handleChange}
            />
            <button
              aria-label="join"
              type="submit"
              className="mb-0 border-b-2 border-black"
            >
              Join
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
