import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import MainPostWidget from "./MainPostWidget";
import AuthState from "interfaces/AuthState";
import { GlobalContext } from "services/appwrite-service";

const PostsWidget = ({
  postInfo,
  isProfile = false,
}: {
  postInfo: {
    postId: string;
    postUserId: string;
    firstName: string;
    lastName: string;
    postText: string;
    location: string;
    postPictureUrl: string;
    userPictureUrl: string;
    likes: number;
    comments: string[];
  };
  isProfile?: boolean;
}) => {
  const { listUserPost } = useContext(GlobalContext);
  const token = useSelector((state: AuthState) => state.token);

  const getPosts = () => {
    // get the other users post
    // do something here... backend
  };

  const getUserPosts = async () => {
    // get the current user post
    await listUserPost(token);
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <MainPostWidget
        key={postInfo.postId}
        postId={postInfo.postId}
        postUserId={postUserId ?? ""}
        name={`${postInfo.firstName} ${postInfo.lastName}`}
        postText={postInfo.postText}
        location={postInfo.location}
        postPictureUrl={postInfo.postPictureUrl}
        userPictureUrl={postInfo.userPictureUrl}
        likes={postInfo.likes}
        comments={postInfo.comments}
      /> */}
    </>
  );
};

export default PostsWidget;
