import * as yup from 'yup'

export const shippingSchema = yup
  .object({
    country: yup.string().required(),
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    address: yup.string().required(),
    email: yup.string().email('Enter a valid email address').required(),
    district: yup.string().required(),
    region: yup.string().required(),
    zip: yup.string().required(),
    phone: yup.string().required(),
  })
  .required()
