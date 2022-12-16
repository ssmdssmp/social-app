import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType, UserDataType, LoginDataType, PostType } from "../types";

export const getUser = createAsyncThunk<UserDataType>(
  "social/getUser",
  (id) => {
    return axios
      .get(`https://social-app-backend-m2ex.onrender.com/api/users/${id}`)
      .then((res) => res.data);
  }
);
export const login = createAsyncThunk<LoginDataType>(
  "social/login",
  (values) => {
    // "proxy": "https://social-app-backend-m2ex.onrender.com",
    return axios
      .post(
        "https://social-app-backend-m2ex.onrender.com/api/auth/login",
        values
      )
      .then((res) => res.data);
  }
);
export const registration = createAsyncThunk<LoginDataType>(
  "social/registration",
  (values) => {
    return axios
      .post(
        "https://social-app-backend-m2ex.onrender.com/api/auth/registration",
        values
      )
      .then((res) => res.data);
  }
);
export const getUserPosts = createAsyncThunk<PostType[]>(
  "social/getUserPosts",
  ({ id, offset }: any) => {
    console.log(id, offset);
    return axios
      .get(
        `https://social-app-backend-m2ex.onrender.com/api/users/posts/${id}/${offset}`
      )
      .then((res) => res.data);
  }
);
export const followUser = createAsyncThunk<UserType[]>(
  "social/followUser",
  ({ userId, currentUserId }: any) => {
    return axios
      .put(
        `https://social-app-backend-m2ex.onrender.com/api/users/${userId}/follow`,
        { userId: currentUserId }
      )
      .then((res) => res.data);
  }
);
export const unfollowUser = createAsyncThunk<UserType[]>(
  "social/unfollowUser",
  ({ userId, currentUserId }: any) => {
    return axios
      .put(
        `https://social-app-backend-m2ex.onrender.com/api/users/${userId}/unfollow`,
        { userId: currentUserId }
      )
      .then((res) => res.data);
  }
);
