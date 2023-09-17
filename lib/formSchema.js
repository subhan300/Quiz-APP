
import * as yup from "yup";

const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender:yup.string().required("Gender is required"),
    yearOfBirth:yup.string().required("Year of Birth is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
   
  });

  export default {
    validationSchema
  }


 