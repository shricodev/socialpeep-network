import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState, useContext } from "react";
import { ID, AppwriteException } from "appwrite";
import { useTheme } from "@mui/system";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import Navbar from "scenes/navbar";
import { GlobalContext, databases } from "services/appwrite-service";
import {
  suggestionSchema,
  initialValuesSuggestion,
} from "schemas/SuggestionSchema";

const SuggestionPage = () => {
  const [loading, setLoading] = useState(false);
  const { getUserData } = useContext(GlobalContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  let fullName = "";
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  // handle the 'Suggestion Submission' Scenario
  const handleFormSubmit = async (
    { query }: { query: string },
    onSubmitProps: FormikHelpers<any>
  ) => {
    setLoading(true);
    try {
      await getUserData().then(({ name }: { name: string }) => {
        fullName = name;
      });

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERSUGGESTION_COLLECTION_ID,
        ID.unique(),
        {
          Suggestion: query,
          Name: fullName,
        }
      );

      console.log("Thank You!, your suggestion has been recorded.");
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    } finally {
      setLoading(false);
      onSubmitProps.resetForm();
      navigate("/home");
    }
  };

  return (
    <Box>
      <Navbar />
      {loading ? (
        <Box
          height="80vh"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <ScaleLoader
            color={palette.primary.main}
            height={55}
            radius={2}
            width={9}
            cssOverride={{ textAlign: "center" }}
          />
        </Box>
      ) : (
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          margin="2rem auto"
          borderRadius="1.5rem"
          bgcolor={palette.background.alt}
        >
          <Typography
            fontWeight="400"
            variant="h5"
            sx={{ mb: "1.5rem", textAlign: "center" }}
          >
            Hello👋, In order to improve your experience even more, we request
            your feedbacks.
          </Typography>
          <Formik
            validationSchema={suggestionSchema}
            initialValues={initialValuesSuggestion}
            onSubmit={handleFormSubmit}
          >
            {/* standard formik syntax */}
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    multiline
                    name="query"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.query}
                    rows={6}
                    variant="outlined"
                    label="Enter your query here..."
                    error={Boolean(touched.query) && Boolean(errors.query)}
                    helperText={touched.query && errors.query}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
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
                    <p>SUBMIT</p>
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
      )
    </Box>
  );
};

export default SuggestionPage;
