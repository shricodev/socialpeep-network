import { PaletteMode } from "@mui/material";
import Post from "./Post";

interface AuthState {
  mode: PaletteMode | undefined;
  user: null | Record<string, unknown>;
  token: null | string;
  posts: Array<Post>;
}

export default AuthState;
