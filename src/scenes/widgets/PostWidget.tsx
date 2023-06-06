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

const PostWidget = ({ imagePath }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: AuthState) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = () => {
    // do something here... backend
  };
};

export default PostWidget;
