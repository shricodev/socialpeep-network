import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import Dropzone from "react-dropzone";

import FlexBetween from "components/FlexBetween";
import { registerSchema, initialValuesRegister } from "schemas/RegisterSchema";

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // const acceptedFiles = ["image/jpg", "image/png", "image/jpeg"];

  const handleFormSubmit = async (
    values: any,
    onSubmitProps: FormikHelpers<any>
  ) => {
    const formData = new FormData();
    for (const value in values) formData.append(value, values[value]);
    formData.append("imagePath", values.picture.name);
    // handle appwrite backend here in future 👇
    onSubmitProps.resetForm();
    navigate("/home");
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={registerSchema}
      initialValues={initialValuesRegister}
    >
      {/* standard formik syntax */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
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
              label="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              label="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              label="Location"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Occupation"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.occupation}
              name="occupation"
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{
                gridColumn: "span 4",
              }}
            />

            {/* PROFILE IMAGE INPUT */}
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="9px"
              p="1rem"
            >
              {/* RECEIVE THE USER IMAGE */}
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>[Required] Add/Drop Your Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>

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
              <p>REGISTER</p>
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
              <Link to="/login">Already have an account? Login here!</Link>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;