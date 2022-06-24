import { Formik } from 'formik'
import { useEffect, useState } from 'react'

import Dropzonebar from '@/components/Dropzonebar'
import { displayFormElement } from '@/components/Form/FormElement'
import { blogAuthorSchema } from '@/components/Form/schema/blog-author-form'
import useMediaUpload from '@/hooks/useMediaUpload'
import blogauthorFormContent from '@/json/blog-author-form.json'

type blogFormDataType = {
  dbNode: string
  data: {
    authorName: string
    aboutAuthor: string
  } | null
}

export default function BlogAuthorForm() {
  const [submitForm, setSubmitForm] = useState(false)
  const [blogFormData, setBlogFormData] = useState<blogFormDataType>({
    dbNode: 'articles/blog/blog-author',
    data: null,
  })
  const { dropzone, style, isUploadSuccessful } = useMediaUpload(blogFormData)

  console.log('isUploadSuccessful', isUploadSuccessful)
  console.log('blogFormData', blogFormData)

  useEffect(() => {
    if (isUploadSuccessful) {
      setSubmitForm(false)
    }
  }, [isUploadSuccessful])

  return (
    <div className="border-l pl-4  blogform flex flex-col w-1/2">
      <h3 className="text-center text-xl mb-4">Create Blog Author Profile</h3>

      <Formik
        initialValues={{
          authorName: '',
          aboutAuthor: '',
        }}
        validationSchema={blogAuthorSchema}
        onSubmit={(values, { resetForm }) => {
          setBlogFormData({
            ...blogFormData,
            data: values,
          })
          setSubmitForm(true)
          resetForm()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {blogauthorFormContent.map((inputDetails) =>
              displayFormElement(inputDetails, formik)
            )}
            <button
              aria-label="submit blog-form"
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
