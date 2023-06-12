import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";

import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import AuthState from "interfaces/AuthState";

const MainPostWidget = ({
  postId,
  postUserId,
  name,
  postText,
  location,
  postPictureUrl,
  userPictureUrl,
  likes,
  comments,
}: {
  postId: string;
  postUserId: string;
  name: string;
  postText: string;
  location: string;
  postPictureUrl: string;
  userPictureUrl: string;
  likes: number;
  comments: string[];
}) => {
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state: AuthState) => state.token);
  // TODO: handle appwrite fxn to keep track of whether the user has liked any of the posts in the feed..

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const alt = palette.background.alt;

  const patchLike = async () => {
    // handle the way to like the post here.
  };

  return (
    <>
      {postId && (
        <WidgetWrapper m="2rem 0" alt={alt}>
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPictureUrl={userPictureUrl}
          />
          <Typography color={main} sx={{ mt: "1rem" }}>
            {postText}
          </Typography>
          {postPictureUrl && (
            <img
              width="100%"
              height="auto"
              alt="UserPost"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={postPictureUrl}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => patchLike()}>
                  {/* check whether the post is liked or not and show the icon accordingly */}
                  {2 ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                {/* place actual like in here for the future */}
                <Typography>{likes}</Typography>
              </FlexBetween>
              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </FlexBetween>
            </FlexBetween>
            <IconButton>
              <ShareOutlined sx={{ cursor: "not-allowed" }} />
            </IconButton>
          </FlexBetween>
          {isComments && (
            <Box mt="0.5">
              {comments.map((comment, ind) => (
                <Box key={`${name}_${ind}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      )}
    </>
  );
};

export default MainPostWidget;
