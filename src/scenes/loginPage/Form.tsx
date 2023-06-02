import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { setLogin } from "state";
import { loginSchema, initialValuesLogin } from "schemas/LoginSchema";

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // const acceptedFiles = ["image/jpg", "image/png", "image/jpeg"];

  const login = async (values: unknown, onSubmitProps: unknown) => {
    console.log("login function invoked");
    console.log(values);

    navigate("/home");
  };

  const handleFormSubmit = async (values: unknown, onSubmitProps: unknown) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={loginSchema}
      initialValues={initialValuesLogin}
    >
      {/* standard formik syntax */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                bgcolor: palette.primary.main,
                color: palette.background.alt,
                borderRadius: "30px",
                "&:hover": { color: palette.primary.main },
              }}
            >
              <p>LOGIN</p>
            </Button>
            <Typography
              onClick={() => {
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
            >
              <Link to="/register">
                Don't have an account? Create One here"
              </Link>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
