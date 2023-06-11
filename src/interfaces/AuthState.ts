import { PaletteMode } from "@mui/material";

interface AuthState {
  mode: PaletteMode | undefined;
  email: Record<string, null> | null;
  token: string | null;
  docId: string | null;
}

export default AuthState;
