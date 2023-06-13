import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useDispatch } from "react-redux";
import { DarkMode, LightMode } from "@mui/icons-material";

import Form from "./Form";
import { setMode } from "state";

const RegisterPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();

  const theme = useTheme();
  const dark: string = theme.palette.neutral.dark;

  return (
    // HEADER BOX
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        bgcolor={theme.palette.background.alt}
        p="1rem 6%"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            userSelect: "none",
            transition: "all 150ms ease-out",
          }}
        >
          socialpeep
        </Typography>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "30px" }} />
          ) : (
            <LightMode sx={{ fontSize: "30px", color: dark }} />
          )}
        </IconButton>
      </Box>

      {/* FORM BOX */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          Start expanding your social circle with SocialPeep!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default RegisterPage;
