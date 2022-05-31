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
  address1: yup.string().required('address1 is required'),
  address2: yup.string().notRequired(),
  phone: yup.number().required('phone number is required'),
  city: yup.string().required('city is required'),
  zip: yup.string().notRequired(),
  state: yup.string().required('State is required'),
  country: yup.string().required('country is required'),
})
