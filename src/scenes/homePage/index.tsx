import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AuthState from "interfaces/AuthState";
import PostWidget from "scenes/widgets/PostWidget";
import { useEffect, useState } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [profileImgId, setProfileImgId] = useState<string | null>(null);
  const _id = useSelector((state: AuthState) => state.token);

  useEffect(() => {
    const storedProfileImgId = localStorage.getItem("profileImgId");
    setProfileImgId(storedProfileImgId);
    localStorage.removeItem("profileImgId");
  }, []);

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
          <UserWidget userId={_id ?? ""} profileImgId={profileImgId ?? ""} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <PostWidget imagePath={imagePath} /> */}
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
