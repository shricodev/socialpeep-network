import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/system";

import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import AuthState from "interfaces/AuthState";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const alt = palette.background.alt;

  const getFriends = async () => {
    // handle appwrite backend here....
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper alt={alt}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {/* map over the friends list here */}
        {/* <Friend
          key={friend.userId}
          friendId={friend.userId}
          name={`${friend.firstName} ${friend.lastName}`}
          subtitle={friend.occupation}
          userPictureUrl={friend.picturePathUrl}
        /> */}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;