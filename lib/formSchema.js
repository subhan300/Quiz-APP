import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
    consent: yup.boolean()
    .oneOf([true], "Consent is required") // Check if consent is true (checked)
    .required("Consent is required"),
});

export default {
  validationSchema,
};
