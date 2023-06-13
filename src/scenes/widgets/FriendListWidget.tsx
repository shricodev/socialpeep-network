import { useContext, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/system";
import ScaleLoader from "react-spinners/ScaleLoader";

import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { GlobalContext } from "services/appwrite-service";
import AuthState from "interfaces/AuthState";
import FriendData from "interfaces/FriendData";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<FriendData[]>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { getFriends, getDocId, getUserDocument } = useContext(GlobalContext);
  const docId = useSelector((state: AuthState) => state.docId);

  const { palette } = useTheme();
  const alt = palette.background.alt;

  const getUserFriends = async () => {
    const response: FriendData[] = await getFriends(docId);
    const friendDocIds: string[] = await Promise.all(response.map(getDocId));
    const friendDocuments: FriendData[] = await Promise.all(
      friendDocIds.map(getUserDocument)
    );
    setFriends(friendDocuments);
    setLoading(false);
  };

  useEffect(() => {
    getUserFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveFriend = (friendId: string) => {
    // Remove the friend from the list
    const updatedFriends = friends?.filter(
      (friend) => friend.userId !== friendId
    );
    setFriends(updatedFriends);
  };

  return (
    <>
      {loading ? (
        <WidgetWrapper alt={alt}>
          <Box
            height="10vh"
            justifyContent="center"
            display="flex"
            alignItems="center"
          >
            <ScaleLoader
              color={palette.primary.main}
              height={25}
              radius={3}
              width={4}
              cssOverride={{ textAlign: "center" }}
            />
          </Box>
        </WidgetWrapper>
      ) : (
        <>
          {friends && friends?.length > 0 && (
            <WidgetWrapper
              alt={alt}
              sx={{
                position: isNonMobileScreens ? "sticky" : "static",
                top: isNonMobileScreens ? "32rem" : "auto",
              }}
            >
              <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
              >
                Your Recent Friends
              </Typography>
              <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends &&
                  Array.isArray(friends) &&
                  friends.length > 0 &&
                  friends.map(
                    (friend, index) =>
                      index < 4 && (
                        <Friend
                          key={friend.userId}
                          friendId={friend.userId}
                          name={`${friend.firstName} ${friend.lastName}`}
                          subtitle={friend.occupation}
                          userPictureUrl={friend.picturePathUrl}
                          onRemove={() => handleRemoveFriend(friend.userId)}
                        />
                      )
                  )}
              </Box>
            </WidgetWrapper>
          )}
        </>
      )}
    </>
  );
};

export default FriendListWidget;
