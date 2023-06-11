import { createSlice } from "@reduxjs/toolkit";

import AuthState from "interfaces/AuthState";

const initialState: AuthState = {
  mode: "light",
  email: null,
  token: null,
  docId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // these are the functions that is used to modify the global state here
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.docId = action.payload.docId;
    },

    setLogout: (state) => {
      state.email = null;
      state.token = null;
      state.docId = null;
      localStorage.clear();
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
