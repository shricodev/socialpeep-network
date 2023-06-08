import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, "FirstName cannot exceed more than 20 characters")
    .required("required"),
  lastName: yup
    .string()
    .max(20, "LastName cannot exceed more than 20 characters")
    .required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().min(8).required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
  twitter: yup.string(),
  linkedin: yup.string(),
  github: yup.string(),
});

export const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  twitter: "",
  linkedin: "",
  github: "",
  picture: {
    name: "",
  },
};
