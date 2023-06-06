import { createSlice } from "@reduxjs/toolkit";

import AuthState from "interfaces/AuthState";

const initialState: AuthState = {
  mode: "light",
  email: null,
  token: null,
  posts: [],
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
    },

    setLogout: (state) => {
      state.email = null;
      state.token = null;
    },

    setFriends: (state, action) => {
      if (state.email) {
        state.email.friends = action.payload.friends;
      } else {
        console.log("User friends are non-existent!");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
