import * as yup from "yup";

export const signupFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("E-mail address is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const signinFormSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("E-mail address is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password is required")
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const passwordRecoverySchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("E-mail address is required"),
});
