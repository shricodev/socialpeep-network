import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

export const initialValuesLogin = {
  email: "",
  password: "",
};
