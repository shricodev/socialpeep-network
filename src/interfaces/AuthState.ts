import Post from "./Post";

interface AuthState {
  mode: string;
  user: null | Record<string, unknown>;
  token: null | string;
  posts: Array<Post>;
}

export default AuthState;
