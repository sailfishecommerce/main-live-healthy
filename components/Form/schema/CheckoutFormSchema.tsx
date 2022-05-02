import * as yup from 'yup'

export const checkoutFormSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('E-mail address is required'),
  country: yup.string().required('Country is required'),
  region: yup.string().required('Region is required'),
  district: yup.string().required('District is required'),
  zip: yup.string().required('Zip Code is required'),
  address: yup.string().required('Address is required'),
})
