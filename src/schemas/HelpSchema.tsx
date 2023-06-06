import * as yup from "yup";

export const helpSchema = yup.object().shape({
  query: yup
    .string()
    .required("required")
    .test(
      "MinWords",
      "Must have at least 2 words",
      (value) => value.split(" ").length >= 2
    ),
});

export const initialValuesHelp = {
  query: "",
};
