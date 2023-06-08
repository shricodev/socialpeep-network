import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";

import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AuthState from "interfaces/AuthState";
import PostWidget from "scenes/widgets/PostWidget";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [previewUrl, setPreviewUrl] = useState("");
  const [profileImgId, setProfileImgId] = useState<string | null>(null);
  const _id = useSelector((state: AuthState) => state.token);

  useEffect(() => {
    // just to give a shuttle feel of loading.. onto the screen
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const storedProfileImgId = localStorage.getItem("profileImgId");
    setProfileImgId(storedProfileImgId);
    localStorage.removeItem("profileImgId");
  }, []);

  return (
    <Box>
      <Navbar />
      {loading ? (
        <Box
          height="85vh"
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
          width="100%"
          p="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget
              userId={_id ?? ""}
              profileImgId={profileImgId ?? ""}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <PostWidget imagePath={previewUrl} />
          </Box>
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
