import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const shippingSchema = yup
  .object({
    country: yup.string().required(),
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    email: yup.string().email('enter a valid email address').required(),
    district: yup.string().required(),
    region: yup.string().required(),
    zip: yup.number().typeError('zip must be a number').required('enter zip'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  })
  .required()
