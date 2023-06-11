import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";

import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AuthState from "interfaces/AuthState";
import PostWidget from "scenes/widgets/PostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdWidget from "scenes/widgets/AdWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostInfoType from "types/PostInfo";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo]: [
    PostInfoType,
    React.Dispatch<React.SetStateAction<PostInfoType>>
  ] = useState({
    postId: "",
    postUserId: "",
    firstName: "",
    lastName: "",
    postText: "",
    location: "",
    postPictureUrl: "",
    userPictureUrl: "",
    likes: 0,
    comments: [""],
  });
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [previewUrl, setPreviewUrl] = useState("");
  const [profileImgId, setProfileImgId] = useState<string | null>(null);
  const userId = useSelector((state: AuthState) => state.token);

  useEffect(() => {
    // just to give a shuttle feel of loading.. onto the screen
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    const storedProfileImgId = localStorage.getItem("profileImgId");
    setProfileImgId(storedProfileImgId);
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
              profileImgUrl={profileImgId ?? ""}
              previewUrl="/assets/profileHead.webp"
              isProfile={false}
            />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId ?? ""} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <PostWidget setPostInfo={setPostInfo} imagePath={previewUrl} />
            <PostsWidget postInfo={postInfo} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdWidget />
              <Box m="2rem 0" />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
