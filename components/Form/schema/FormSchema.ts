import * as yup from "yup";

export const contactForMore = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("E-mail address is required"),
  companyName: yup.string().required("Company name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  message: yup.string().required("message is required"),
});
