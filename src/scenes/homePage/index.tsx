import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";

import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PostWidget from "scenes/widgets/PostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import NewsWidget from "scenes/widgets/NewsWidget";

import AuthState from "interfaces/AuthState";
import PostInfoType from "types/PostInfo";
import { Article } from "types/Article";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [postInfo, setPostInfo]: [
    PostInfoType,
    React.Dispatch<React.SetStateAction<PostInfoType>>
  ] = useState({
    postId: "",
    postUserId: "",
    firstName: "",
    lastName: "",
    postText: "",
    location: "",
    postPictureUrl: "",
    userPictureUrl: "",
    likes: 0,
    comments: [""],
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [profileImgId, setProfileImgId] = useState<string | null>(null);

  const userId = useSelector((state: AuthState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();

  const getNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=technology&language=en&sortBy=publishedAt`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": import.meta.env.VITE_NEWSAPIORG_API,
          },
        }
      );

      const data = await response.json();
      const articles = data.articles.slice(0, 2).map((article: Article) => ({
        title: article.title,
        url: article.url,
        description: article.description,
        urlToImage: article.urlToImage,
      }));
      setArticles(articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
    const storedProfileImgId = localStorage.getItem("profileImgId");
    setProfileImgId(storedProfileImgId);
    // just to give a shuttle feel of loading.. onto the screen
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            height={50}
            radius={2}
            width={7}
            cssOverride={{ textAlign: "center" }}
          />
        </Box>
      ) : (
        <Box
          width="100%"
          p="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget
              profileImgUrl={profileImgId ?? ""}
              previewUrl="/assets/profileHead.webp"
              isProfile={false}
            />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId ?? ""} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <PostWidget setPostInfo={setPostInfo} imagePath={previewUrl} />
            <PostsWidget postInfo={postInfo} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              {articles && <NewsWidget articles={articles} />}
              <Box m="2rem 0" />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
