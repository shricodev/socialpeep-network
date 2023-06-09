interface Post {
  postId: string;
  userId: string;
  firstName: string;
  lastName: string;
  postText: string;
  location: string;
  postPictureUrl: string;
  userPictureUrl: string;
  likes: number;
  comments: string[];
}

export default Post;
