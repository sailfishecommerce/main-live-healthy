import * as yup from 'yup'

export const contactFormSchema = yup.object({
  name: yup.string().required('name is required'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('e-mail address is required'),
  phone: yup.string().required('phone is required'),
  subject: yup.string().required('subject is required'),
  message: yup.string().required('message is required'),
})
