import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  InputBase,
  IconButton,
  FormControl,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/system";
import {
  DarkMode,
  LightMode,
  Menu,
  Search,
  Help,
  Home,
  Close,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";
import { setMode, setLogout } from "state";
import { GlobalContext } from "services/appwrite-service";
import UserData from "interfaces/UserData";

const Navbar = () => {
  const { getUserData } = useContext(GlobalContext);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight: string = theme.palette.neutral.light;
  const dark: string = theme.palette.neutral.dark;
  const background: string = theme.palette.background.default;
  const bgAlt: string = theme.palette.background.alt;

  const scrollToTop = (): void => {
    if (location.pathname !== "/home") navigate("/home");
    else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getUserData().then((result: UserData) => {
      setUserName(result.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexBetween padding="1rem 6%" style={{ backgroundColor: bgAlt }}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            userSelect: "none",
            "&:hover": {
              opacity: 0.8,
              cursor: "pointer",
            },
            transition: "all 150ms ease-out",
          }}
        >
          socialpeep
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius="14px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search.." sx={{ userSelect: "none" }} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={scrollToTop}>
            <Home sx={{ fontSize: "25px", color: dark }} />
          </IconButton>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <IconButton onClick={() => navigate("/help")}>
            <Help sx={{ fontSize: "25px", color: dark }} />
          </IconButton>
          <FormControl variant="standard">
            <Select
              value={userName}
              sx={{
                backgroundColor: neutralLight,
                width: "180px",
                borderRadius: "1rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3.5rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={userName}>
                <Typography>{userName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography>Log Out</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        // FOR MOBILE SCREEN
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            gap="3rem"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={scrollToTop}>
              <Home sx={{ fontSize: "25px", color: dark }} />
            </IconButton>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/help")}>
              <Help sx={{ fontSize: "25px", color: dark }} />
            </IconButton>
            <FormControl variant="standard">
              <Select
                value={userName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={userName}>
                  <Typography>{userName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <Typography>Log Out</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
