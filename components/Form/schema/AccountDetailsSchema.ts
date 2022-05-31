import * as yup from 'yup'

export const accountDetailsSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  userEmail: yup
    .string()
    .email('Enter a valid email address')
    .required('E-mail address is required'),
  phoneNumber: yup.string().notRequired(),
})
