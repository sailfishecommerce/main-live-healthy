import { Formik } from 'formik'

import Dropzonebar from '@/components/Dropzonebar'
import { displayFormElement } from '@/components/Form/FormElement'
import useMediaUpload from '@/hooks/useMediaUpload'
import blogauthorFormContent from '@/json/blog-author-form.json'

export default function BlogAuthorForm() {
  const { dropzone, style, isUploadSuccessful } = useMediaUpload()

  return (
    <div className="border-l  blogform flex flex-col w-1/2">
      <h3 className="text-center text-xl mb-4">Create Blog Author Profile</h3>

      <Formik
        initialValues={{
          authorName: '',
          aboutTheAuthor: '',
        }}
        onSubmit={(values) => {
          console.log('values', values)
        }}
      >
        {(formik) => (
          <form>
            {blogauthorFormContent.map((inputDetails) =>
              displayFormElement(inputDetails, formik)
            )}
          </form>
        )}
      </Formik>
      <Dropzonebar
        style={style}
        dropzone={dropzone}
        fileType="images"
        uploadStatus={isUploadSuccessful}
        message="author image "
      />
    </div>
  )
}
