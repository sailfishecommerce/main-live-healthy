/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import Dropzonebar from '@/components/Dropzonebar'
import useMediaUpload from '@/hooks/useMediaUpload'
import { blogAuthorFormAtom } from '@/lib/atomConfig'

export default function BlogAuthorForm() {
  const [submitForm, setSubmitForm] = useState(false)
  const [blogFormData, setBlogFormData] = useAtom(blogAuthorFormAtom)
  const { dropzone, style, isUploadSuccessful } = useMediaUpload(
    blogFormData,
    submitForm
  )

  useEffect(() => {
    if (isUploadSuccessful) {
      setSubmitForm(false)
      setBlogFormData({
        dbNode: 'articles/blog/blog-author',
        data: {
          authorName: '',
          aboutAuthor: '',
        },
      })
    }
  }, [isUploadSuccessful])

  function inputHandler(e: any) {
    setBlogFormData({
      ...blogFormData,
      data: {
        ...blogFormData.data,
        [e.target.name]: e.target.value,
      },
    })
  }

  function submitHandler(e: any) {
    e.preventDefault()
    setSubmitForm(true)
  }

  return (
    <div className="border-l pl-4  blogform flex flex-col w-1/2">
      <h3 className="text-center text-xl mb-4">Create Blog Author Profile</h3>

      <form className="flex flex-col" onSubmit={submitHandler}>
        <input
          required
          className="border border-gray-200 px-2 rounded-md h-10 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
          name="authorName"
          value={blogFormData.data.authorName}
          placeholder="Author's name"
          onChange={inputHandler}
        />
        <textarea
          required
          className="border-2 border-gray-200 rounded-md mt-4 p-3"
          name="aboutAuthor"
          value={blogFormData.data.aboutAuthor}
          placeholder="About Author"
          rows={5}
          onChange={inputHandler}
        ></textarea>
        <button
          aria-label="submit blog-form"
          className="bg-mountain-green mx-auto rounded-md  mt-4 text-white px-3 py-2 flex"
          type="submit"
          title="next"
        >
          Next
        </button>
      </form>
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
