import { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import PostWidget from "scenes/widgets/PostWidget";
import { GlobalContext } from "services/appwrite-service";

const ProfilePage = () => {
  let otherUserDocId: string;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    twitter: "",
    linkedin: "",
    github: "",
    viewedProfile: 0,
    impressions: 0,
    friends: [],
  });

  const { getUserDocument, getDocId, checkUserIdValidity } =
    useContext(GlobalContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { palette } = useTheme();

  useEffect(() => {
    setLoading(true);
    const checkValidity = async () => {
      if ((await checkUserIdValidity(userId)) === false) {
        navigate("/home");
      }
      setLoading(false);
    };
    checkValidity();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
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
              height={50}
              radius={2}
              width={7}
              cssOverride={{ textAlign: "center" }}
            />
          </Box>
        ) : (
          <Box
            width="100%"
            p="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget
                profileImgUrl={"/assets/profileHead.webp"}
                isProfile={true}
                previewUrl={""}
              />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId ?? ""} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <PostWidget imagePath="/assets/advertise.webp" />
              <PostsWidget isProfile={true} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfilePage;
