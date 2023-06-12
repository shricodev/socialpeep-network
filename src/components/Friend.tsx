import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import AuthState from "interfaces/AuthState";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPictureUrl,
}: {
  friendId: string;
  name: string;
  subtitle: string;
  userPictureUrl: string;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: AuthState) => state.token);
  const friends = useSelector((state: AuthState) => state.friends);
  const isSelf = friendId === token;

  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const isFriend = friends.find((friend) => friend.userId === friendId);

  const patchFriend = () => {
    // do friend remove and add action here...
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage imageUrl={"/assets/profileHead.webp"} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // to refresh the component. not a very ideal way
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                opacity: 0.8,
                transition: "150ms all ease-out",
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isSelf && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {/* this should be handled properly */}
          {true ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
