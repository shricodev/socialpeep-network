import { PaletteMode } from "@mui/material";
import Post from "./Post";

interface AuthState {
  mode: PaletteMode | undefined;
  email: Record<string, null> | null;
  token: string | null;
  posts: Array<Post>;
}

export default AuthState;
