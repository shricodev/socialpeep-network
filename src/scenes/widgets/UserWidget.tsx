import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/system";
import { AppwriteException, Storage } from "appwrite";

import { GlobalContext, client } from "services/appwrite-service";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import AuthState from "interfaces/AuthState";

const UserWidget = ({
  userId,
  profileImgId,
}: {
  userId: string;
  profileImgId: string;
}) => {
  const { getUserDocument } = useContext(GlobalContext);
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
  const [previewUrl, setPreviewUrl] = useState("");
  const [, setEditInput] = useState(false);
  const userDocId = localStorage.getItem("docId");
  const { palette } = useTheme();
  const token = useSelector((state: AuthState) => state.token);
  const navigate = useNavigate();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  const getUserProfileImg = async () => {
    try {
      const storage = new Storage(client);
      const result = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_USERIMAGE_BUCKET_ID,
        profileImgId
        // eplicitely setting the width of the image.
        // 60
      );
      setPreviewUrl(result.href);
      console.log(previewUrl);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  useEffect(() => {
    getUserProfileImg();
    getUserDocument().then((result: any) => {
      setUser(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    twitter,
    linkedin,
    github,
    viewedProfile = 10,
    impressions = 10,
    friends = ["ram", "shyam", "hari"],
  }: {
    firstName: string;
    lastName: string;
    location: string;
    occupation: string;
    twitter: string;
    linkedin: string;
    github: string;
    viewedProfile: number;
    impressions: number;
    friends: string[];
  } = user;

  return (
    <WidgetWrapper alt={alt}>
      {/* FIRST ROW OF THE USER WIDGET */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage imageUrl={previewUrl} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  transition: "all 150ms ease-out",
                },
                cursor: "pointer",
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      {/* SECOND ROW OF THE USER WIDGET */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* THIRD ROW OF THE USER WIDGET */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      {/* FOURTH ROW OF THE USER WIDGET */}
      {(twitter || linkedin || github) && <Divider />}
      {(twitter || linkedin || github) && (
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          {twitter && (
            <FlexBetween gap="1rem" mb="0.5rem">
              <a href={twitter} target="_blank">
                <FlexBetween gap="1rem">
                  <img src="../assets/twitter.png" alt="twitter" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      Twitter
                    </Typography>
                    <Typography color={medium}>Social Network</Typography>
                  </Box>
                </FlexBetween>
              </a>
              {userId === token && (
                <EditOutlined
                  sx={{ color: main }}
                  onClick={() => {
                    setEditInput(true);
                  }}
                />
              )}
            </FlexBetween>
          )}

          {linkedin && (
            <FlexBetween gap="1rem">
              <a href={linkedin} target="_blank">
                <FlexBetween gap="1rem">
                  <img src="../assets/linkedin.png" alt="linkedin" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      LinkedIn
                    </Typography>
                    <Typography color={medium}>Network Platform</Typography>
                  </Box>
                </FlexBetween>
              </a>
              {userId === token && (
                <EditOutlined
                  sx={{ color: main }}
                  onClick={() => {
                    setEditInput(true);
                  }}
                />
              )}
            </FlexBetween>
          )}

          {github && (
            <FlexBetween gap="1rem" mb="0.5rem">
              <a href={github} target="_blank">
                <FlexBetween gap="1rem">
                  <img src="../assets/github.png" alt="github" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      GitHub
                    </Typography>
                    <Typography color={medium}>
                      Code Sharing Platform
                    </Typography>
                  </Box>
                </FlexBetween>
              </a>
              {userId === token && (
                <EditOutlined
                  sx={{ color: main }}
                  onClick={() => {
                    setEditInput(true);
                  }}
                />
              )}
            </FlexBetween>
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
