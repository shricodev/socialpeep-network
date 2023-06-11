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
import { AppwriteException, Query } from "appwrite";
import { ScaleLoader } from "react-spinners";

import { setLogin } from "state";
import { GlobalContext, databases } from "services/appwrite-service";
import { loginSchema, initialValuesLogin } from "schemas/LoginSchema";

const Form = () => {
  let docId: string;
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
      getUserData().then(({ $id: userId }: { $id: string }) => {
        const response = databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_USERDATA_COLLECTION_ID,
          [Query.equal("userId", [userId])]
        );

        response.then((result) => {
          if (result.documents && result.documents.length > 0) {
            docId = result.documents[0].$id;
          }
          dispatch(
            setLogin({
              email: email,
              token: userId,
              docId: docId,
            })
          );
          localStorage.setItem("docId", docId);
        });
      });
      navigate("/home");
    } catch (error) {
      const appwriteError = error as AppwriteException;
      // TODO: show different error message on invalid credentials. I am not able to find how to handle this thing. error.code is not working... :(
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
