import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MainPostWidget from "./MainPostWidget";
import AuthState from "interfaces/AuthState";
import { GlobalContext } from "services/appwrite-service";

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
  const { listUserPost, getUserDocument } = useContext(GlobalContext);
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
  const [posts, setPosts] = useState([]);
  const token = useSelector((state: AuthState) => state.token);
  const docId = useSelector((state: AuthState) => state.docId);

  const getPosts = () => {
    // get the other users post
    // do something here... backend
  };

  const getUserPosts = async () => {
    // get the current user post
    const userDetails = await getUserDocument(docId);
    const { documents } = await listUserPost(token);

    setUser(userDetails);
    setPosts(documents);
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default PostsWidget;
