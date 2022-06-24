import { Formik } from 'formik'
import { useState } from 'react'

import Dropzonebar from '@/components/Dropzonebar'
import { displayFormElement } from '@/components/Form/FormElement'
import { blogAuthorSchema } from '@/components/Form/schema/blog-author-form'
import useMediaUpload from '@/hooks/useMediaUpload'
import blogauthorFormContent from '@/json/blog-author-form.json'

export default function BlogAuthorForm() {
  const [submitForm, setSubmitForm] = useState(false)
  const { dropzone, style, isUploadSuccessful } = useMediaUpload(
    'articles/blog/blog-author'
  )

  return (
    <div className="border-l pl-4  blogform flex flex-col w-1/2">
      <h3 className="text-center text-xl mb-4">Create Blog Author Profile</h3>

      <Formik
        initialValues={{
          authorName: '',
          aboutAuthor: '',
        }}
        validationSchema={blogAuthorSchema}
        onSubmit={(values) => {
          console.log('values', values)
          setSubmitForm(true)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {blogauthorFormContent.map((inputDetails) =>
              displayFormElement(inputDetails, formik)
            )}
            <button
              aria-label="Sign up"
              className="bg-mountain-green mx-auto rounded-md  mt-4 text-white px-3 py-2 flex"
              type="submit"
              title="Sign up"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      {submitForm && (
        <Dropzonebar
          style={style}
          dropzone={dropzone}
          fileType="images"
          uploadStatus={isUploadSuccessful}
          message="author image "
        />
      )}
    </div>
  )
}
