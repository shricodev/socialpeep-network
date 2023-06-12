import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/system";

import MainPostWidget from "./MainPostWidget";
import AuthState from "interfaces/AuthState";
import { GlobalContext } from "services/appwrite-service";
import { Box } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const PostsWidget = ({
  // postInfo,
  isProfile = false,
}: {
  // postInfo: {
  //   postId: string;
  //   postUserId: string;
  //   firstName: string;
  //   lastName: string;
  //   postText: string;
  //   location: string;
  //   postPictureUrl: string;
  //   userPictureUrl: string;
  //   likes: number;
  //   comments: string[];
  // };
  isProfile?: boolean;
}) => {
  const { listUserPost, getUserDocument, getUserPostsImpressions } =
    useContext(GlobalContext);
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
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = useSelector((state: AuthState) => state.token);
  const docId = useSelector((state: AuthState) => state.docId);
  const { palette } = useTheme();

  const getPosts = () => {
    // get the other users post
    // do something here... backend
  };

  const getUserPosts = async () => {
    // get the current user post
    setLoading(true);
    const userDetails = await getUserDocument(docId);
    const { documents } = await listUserPost(token);
    const impressions = await getUserPostsImpressions(token);
    setUser(userDetails);
    setPosts(documents);
    setLoading(false);
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            height={45}
            radius={2}
            width={6}
            cssOverride={{ textAlign: "center" }}
          />
        </Box>
      ) : (
        <>
          {posts.map(
            ({ $id, Content, Likes, Comments, userId, postPictureUrl }) => (
              <MainPostWidget
                key={$id}
                postId={$id}
                postUserId={userId ?? ""}
                name={`${user.firstName} ${user.lastName}`}
                postText={Content}
                location={user.location}
                postPictureUrl="/assets/advertise.webp"
                userPictureUrl="/assets/profileHead.webp"
                likes={Likes}
                comments={Comments}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default PostsWidget;
