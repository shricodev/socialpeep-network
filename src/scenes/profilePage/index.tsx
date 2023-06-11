import { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";

import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import PostWidget from "scenes/widgets/PostWidget";
import { databases, client, GlobalContext } from "services/appwrite-service";
import { AppwriteException, Query, Storage } from "appwrite";
import { ScaleLoader } from "react-spinners";

const ProfilePage = () => {
  let otherUserDocId: string;
  const { getUserDocument, getDocId, checkUserIdValidity } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
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
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // this is the main function and it needs to be here to fetch the image once implemented
  // const getUser = async () => {
  //   try {
  //     const userDocId = await getDocId(userId);
  //     const userDetails = await getUserDocument(userDocId);
  //     setUser(userDetails);
  //     console.log(userDetails);
  //     setTimeout(() => {}, 2000);
  //   } catch (error) {
  //     const appwriteError = error as AppwriteException;
  //     console.error(appwriteError.message);
  //   }
  // };

  useEffect(() => {
    // if the userId in the url is not valid then redirect the user to their own profile page.
    if (!checkUserIdValidity(userId)) <Navigate to="/profile" />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* <PostsWidget isProfile={true} /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
