import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AuthState from "interfaces/AuthState";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state: AuthState) => state.user);
  const _id = user?.id ?? "";
  const imagePath = user?.imagePath ?? "";
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} imagePath={imagePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* add widgets here */}
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;