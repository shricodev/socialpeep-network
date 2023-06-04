import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().min(8).required("required"),
});

export const initialValuesLogin = {
  email: "",
  password: "",
};
