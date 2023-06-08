import {
  ImageOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  EditOutlined,
  MicOutlined,
  GifBoxOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useMediaQuery,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { setPosts } from "state";
import FlexBetween from "components/FlexBetween";
import AuthState from "interfaces/AuthState";

const PostWidget = ({ imagePath }: { imagePath: string }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState("");
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const token = useSelector((state: AuthState) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  const handlePost = () => {
    // do something here... backend
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
              setDroppedFile(file);
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
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
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