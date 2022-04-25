import * as yup from "yup";

export const checkoutFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("E-mail address is required"),
  companyName: yup.string().required("Company name is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip Code is required"),
  address1: yup.string().required("Address is required"),
  address2: yup.string().notRequired(),
});
