import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { ID, AppwriteException, Storage } from "appwrite";
import { useTheme } from "@mui/system";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import Dropzone from "react-dropzone";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

import { GlobalContext, databases, client } from "services/appwrite-service";
import FlexBetween from "components/FlexBetween";
import { registerSchema, initialValuesRegister } from "schemas/RegisterSchema";

const Form = () => {
  const { register } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  // added this state since I had to handle the strict type checking.
  const [droppedFile, setDroppedFile] = useState<File | null>(null);

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleProfileImageSubmit = async () => {
    const storage = new Storage(client);
    if (droppedFile) {
      const { $id: fileId } = await storage.createFile(
        import.meta.env.VITE_APPWRITE_USERIMAGE_BUCKET_ID,
        ID.unique(),
        droppedFile
      );
      // store the user profile image id in the localstorage so i don't need to pass it to multiple components
      localStorage.setItem("profileImgId", fileId);
    }
  };

  // handle the 'Register' Scenario
  const handleFormSubmit = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmitProps: FormikHelpers<any>
  ) => {
    setLoading(true);
    try {
      // destructure the id returned from the account.create and store it in the userId.
      // create appwrite account with the user email and password
      const { $id: userId } = await register(
        values.email,
        values.password,
        `${values.firstName} ${values.lastName}`
      );
      console.log(values);

      const { $id: docId } = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERDATA_COLLECTION_ID,
        ID.unique(),
        {
          firstName: values.firstName,
          lastName: values.lastName,
          location: values.location,
          userId: userId,
          occupation: values.occupation,
          twitter: values.twitter,
          linkedin: values.linkedin,
          github: values.github,
        }
      );
      localStorage.setItem("docId", docId);
      handleProfileImageSubmit();
      onSubmitProps.resetForm();
      navigate("/home");
    } catch (error) {
      const appwriteError = error as AppwriteException;
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />

                {/* PROFILE IMAGE INPUT */}
                {/* TODO: make sure that the dropzone only accepts the file type of .jpg, .png and .jpeg */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="9px"
                  p="1rem"
                >
                  {/* RECEIVE THE USER IMAGE */}
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      setDroppedFile(file);
                      if (file.size <= 5 * 1024 * 1024) {
                        setFieldValue("picture", file);
                        setFileError("");
                      } else {
                        setFileError("File size exceeds the limit of 5MB");
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <Box
                        {...getRootProps()}
                        className={`dropzone ${isDragActive ? "active" : ""}`}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input
                          className="uploader dropzone"
                          {...getInputProps()}
                        />
                        {!values.picture.name ? (
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
                  {/* conditionally render the fileError if the size of the file is
                  more than 5MB */}
                  {fileError && (
                    <Typography color="error.main" fontSize="14px">
                      {fileError}
                    </Typography>
                  )}
                </Box>

                <TextField
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.email}
                  name="email"
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
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
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  label="Optional - Twitter URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.twitter}
                  name="twitter"
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
                  label="Optional - LinkedIn URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.linkedin}
                  name="linkedin"
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
                  label="Optional - GitHub URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.github}
                  name="github"
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
                <Button
                  fullWidth
                  disabled={fileError !== ""}
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
      )}
    </>
  );
};

export default Form;
