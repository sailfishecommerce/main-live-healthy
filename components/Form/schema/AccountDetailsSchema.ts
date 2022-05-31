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

export const shippingDetailsSchema = yup.object({
  address1: yup.string().required('First name is required'),
  address2: yup.string().required('First name is required'),
  phone: yup.number().required('First name is required'),
  city: yup.string().required('Last name is required'),
  zip: yup.string().required('Last name is required'),
  state: yup.string().required('Last name is required'),
  country: yup
    .string()
    .email('Enter a valid email address')
    .required('E-mail address is required'),
  phoneNumber: yup.string().notRequired(),
})
