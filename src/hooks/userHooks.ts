import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType, UserDataType, LoginDataType, PostType } from "../types";

export const getUser = createAsyncThunk<UserDataType>(
  "social/getUser",
  async (id) => {
    return await axios.get(`/api/users/${id}`).then((res) => res.data);
  }
);
export const login = createAsyncThunk<LoginDataType>(
  "social/login",
  async (values) => {
    return await axios.post("/api/auth/login", values).then((res) => res.data);
  }
);
export const registration = createAsyncThunk<LoginDataType>(
  "social/registration",
  async (values) => {
    return await axios
      .post("api/auth/registration", values)
      .then((res) => res.data);
  }
);
export const getUserPosts = createAsyncThunk<PostType[]>(
  "social/getUserPosts",
  async ({ id, offset }: any) => {
    return await axios
      .get(`/api/users/posts/${id}/${offset}`)
      .then((res) => res.data);
  }
);
export const followUser = createAsyncThunk<UserType[]>(
  "social/followUser",
  async ({ userId, currentUserId }: any) => {
    return await axios
      .put(`/api/users/${userId}/follow`, { userId: currentUserId })
      .then((res) => res.data);
  }
);
export const unfollowUser = createAsyncThunk<UserType[]>(
  "social/unfollowUser",
  async ({ userId, currentUserId }: any) => {
    return await axios
      .put(`/api/users/${userId}/unfollow`, { userId: currentUserId })
      .then((res) => res.data);
  }
);
