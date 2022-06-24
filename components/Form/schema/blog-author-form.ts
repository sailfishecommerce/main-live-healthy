import * as yup from 'yup'

export const blogAuthorSchema = yup.object({
  authorName: yup.string().required('Author name is required'),
  aboutAuthor: yup.string().required('Write something about the author'),
})
