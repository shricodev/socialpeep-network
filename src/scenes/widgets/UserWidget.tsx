import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";

import { GlobalContext } from "services/appwrite-service";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import AuthState from "interfaces/AuthState";
import { AppwriteException } from "appwrite";
import { ScaleLoader } from "react-spinners";

const UserWidget = ({
  profileImgUrl,
  previewUrl,
  isProfile,
}: {
  profileImgUrl: string;
  previewUrl: string;
  isProfile: boolean;
  // setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
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
    impressions: 0,
    friends: [],
  });
  const routeLocation = useLocation();
  const [isHome, setIsHome] = useState(routeLocation.pathname === "/home");
  const { getUserProfileImg, getDocId, getUserPostsImpressions } =
    useContext(GlobalContext);
  const [, setEditInput] = useState(false);
  const { palette } = useTheme();
  const loggedInUserId = useSelector((state: AuthState) => state.token);
  const { userId } = useParams();
  const [impressions, setImpressions] = useState(0);
  const [loading, setLoading] = useState(false);

  const isLoggedInProfile = userId === loggedInUserId;
  const navigate = useNavigate();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  const getUser = async (userId: string) => {
    try {
      setLoading(true);
      const userDocId = await getDocId(userId);
      const userDetails = await getUserDocument(userDocId);
      const impressions = await getUserPostsImpressions(userId);
      setImpressions(impressions);
      setUser(userDetails);
      setLoading(false);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      console.error(appwriteError.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // getUserProfileImg(setPreviewUrl);
    if (!userId || isLoggedInProfile) {
      getUser(loggedInUserId ?? "");
    } else {
      getUser(userId ?? "");
    }
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
    friends = ["ram", "shyam", "hari"],
  }: {
    firstName: string;
    lastName: string;
    location: string;
    occupation: string;
    twitter: string;
    linkedin: string;
    github: string;
    friends: string[];
  } = user;

  return (
    <>
      {loading ? (
        <Box
          height="50vh"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <ScaleLoader
            color={palette.primary.main}
            height={20}
            radius={2}
            width={4}
            cssOverride={{ textAlign: "center" }}
          />
        </Box>
      ) : (
        <WidgetWrapper alt={alt}>
          {/* FIRST ROW OF THE USER WIDGET */}
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${loggedInUserId}`)}
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
            {((isLoggedInProfile && !isProfile) ||
              routeLocation.pathname === "/home") && <ManageAccountsOutlined />}
          </FlexBetween>
          <Divider />
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
            <FlexBetween>
              <Typography color={medium}>Impressions on your posts</Typography>
              <Typography color={main} fontWeight="500">
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>
          {/* FOURTH ROW OF THE USER WIDGET */}
          {(twitter || linkedin || github) && <Divider />}
          {(twitter || linkedin || github) && (
            <Box p="1rem 0">
              <Typography
                fontSize="1rem"
                color={main}
                fontWeight="500"
                mb="1rem"
              >
                Social Profiles
              </Typography>

              {twitter && (
                <FlexBetween gap="1rem" mb="0.5rem">
                  <a href={twitter} target="_blank">
                    <FlexBetween gap="1rem">
                      <img src="../assets/twitter.webp" alt="twitter" />
                      <Box>
                        <Typography color={main} fontWeight="500">
                          Twitter
                        </Typography>
                        <Typography color={medium}>Social Network</Typography>
                      </Box>
                    </FlexBetween>
                  </a>
                  {(isLoggedInProfile || isHome) && (
                    <IconButton
                      onClick={() => {
                        setEditInput(true);
                      }}
                    >
                      <EditOutlined sx={{ color: main }} />
                    </IconButton>
                  )}
                </FlexBetween>
              )}

              {linkedin && (
                <FlexBetween gap="1rem">
                  <a href={linkedin} target="_blank">
                    <FlexBetween gap="1rem">
                      <img src="../assets/linkedin.webp" alt="linkedin" />
                      <Box>
                        <Typography color={main} fontWeight="500">
                          LinkedIn
                        </Typography>
                        <Typography color={medium}>Network Platform</Typography>
                      </Box>
                    </FlexBetween>
                  </a>
                  {(isLoggedInProfile || isHome) && (
                    <IconButton
                      onClick={() => {
                        setEditInput(true);
                      }}
                    >
                      <EditOutlined sx={{ color: main }} />
                    </IconButton>
                  )}
                </FlexBetween>
              )}

              {github && (
                <FlexBetween gap="1rem" mb="0.5rem">
                  <a href={github} target="_blank">
                    <FlexBetween gap="1rem">
                      <img src="../assets/github.webp" alt="github" />
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
                  {(isLoggedInProfile || isHome) && (
                    <IconButton
                      onClick={() => {
                        setEditInput(true);
                      }}
                    >
                      <EditOutlined sx={{ color: main }} />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Box>
          )}
        </WidgetWrapper>
      )}
    </>
  );
};

export default UserWidget;
