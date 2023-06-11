import {
  ImageOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  EditOutlined,
  EmojiEmotionsOutlined,
  GifBoxOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Picker from "@emoji-mart/react";
import {
  Box,
  Typography,
  InputBase,
  useMediaQuery,
  Divider,
  IconButton,
  Button,
  Popover,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Dropzone from "react-dropzone";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import AuthState from "interfaces/AuthState";
import { GlobalContext } from "services/appwrite-service";
import PostInfoType from "types/PostInfo";

const PostWidget = ({
  setPostInfo,
  imagePath,
}: {
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfoType>>;
  imagePath: string;
}) => {
  const { handleAddPost, getUserDocument } = useContext(GlobalContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isImage, setIsImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState("");
  const [fileError, setFileError] = useState("");
  // this is specific to the popoer component.
  const [anchorEl, setAnchorEl] = useState(null);
  const { palette } = useTheme();

  const postUserId = useSelector((state: AuthState) => state.token) ?? "";
  const docId = useSelector((state: AuthState) => state.docId);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  const handlePost = async () => {
    const postImage = image;
    const postText = post;
    const postId: string = await handleAddPost(postText, postUserId, 100, [
      "Hello!!",
      "hi!!",
    ]);
    const response = await getUserDocument(docId);
    const {
      firstName,
      lastName,
      location,
    }: { firstName: string; lastName: string; location: string } = response;
    const postInfo = {
      postId,
      postUserId,
      firstName,
      lastName,
      postText,
      location,
      postPictureUrl: "/assets/advertise.webp",
      userPictureUrl: "/assets/github.webp",
      likes: 0,
      comments: [""],
    };
    setPostInfo(postInfo);
    // clear out the posttext, image and the fileError if any.
    setPost("");
    setImage(null);
    setFileError("");
  };

  const handleEmojiSelect = (emoji: any) => {
    setPost((prevPost) => prevPost + emoji.native);
  };

  const handleToggleEmojiPicker = (event: any) => {
    setAnchorEl(event.currentTarget);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiPickerClose = () => {
    setShowEmojiPicker(false);
    setAnchorEl(null);
  };

  return (
    <WidgetWrapper alt={alt}>
      <FlexBetween gap="1.5rem">
        <UserImage imageUrl={imagePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(event) => setPost(event.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <Popover
          open={showEmojiPicker}
          onClose={handleEmojiPickerClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box sx={{ p: 0.4 }}>
            <Picker onEmojiSelect={handleEmojiSelect} />
          </Box>
        </Popover>
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file.size <= 5 * 1024 * 1024) {
                setImage(file);
                setFileError("");
              } else {
                setFileError("File size exceeds the limit of 5MB");
              }
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                  border={`2px dashed ${palette.primary.main}`}
                  width="100%"
                  p="0.75rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input className="uploader dropzone" {...getInputProps()} />
                  {!image ? (
                    <p>[Required] Add/Drop Your Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ p: "1rem", ml: "12px" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          {/* conditionally render the fileError if the filesize is
              more than 5MB */}
          {fileError && (
            <Typography color="error.main" fontSize="14px">
              {fileError}
            </Typography>
          )}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={handleToggleEmojiPicker}>
              <EmojiEmotionsOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Emoji</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" sx={{ cursor: "not-allowed" }}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" sx={{ cursor: "not-allowed" }}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          type="submit"
          sx={{
            color: palette.primary.main,
            backgroundColor: palette.background.alt,
            borderRadius: "3rem",
            "&:hover": {
              transition: "all 200ms ease-out",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
