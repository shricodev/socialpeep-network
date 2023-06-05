import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useTheme } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { AppwriteException } from "appwrite";
import { ScaleLoader } from "react-spinners";

import { setLogin } from "state";
import { GlobalContext } from "services/appwrite-service";
import { loginSchema, initialValuesLogin } from "schemas/LoginSchema";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const { login, getUserData } = useContext(GlobalContext);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [errorMessage, setErrorMessage] = useState("");

  // handle the 'Login' Scenario
  const handleFormSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await login(email, password);
      getUserData().then(({ $id: UserId }: { $id: string }) => {
        dispatch(
          setLogin({
            email: email,
            token: UserId,
          })
        );
      });
      navigate("/home");
    } catch (error) {
      const appwriteError = error as AppwriteException;
      setErrorMessage("There was a problem signing you in!");
      throw new Error(appwriteError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ScaleLoader
          color={palette.primary.main}
          height={45}
          radius={2}
          width={7}
          cssOverride={{ textAlign: "center" }}
        />
      ) : (
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
              </Box>

              {/* BUTTONS */}
              <Box>
                {/* conditionally render the error message */}
                {errorMessage && (
                  <Box
                    color="error.main"
                    fontSize="14px"
                    justifyContent="center"
                    mt="5px"
                  >
                    {errorMessage}
                  </Box>
                )}
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
                    Don't have an account? Create One here!
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Form;
