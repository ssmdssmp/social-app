import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../types";
import axios from "axios";
export const createPost = createAsyncThunk<PostType>(
  "social/createPost",
  async (values) => {
    return await axios
      .post(
        "https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/",
        values
      )
      .then((res) => res.data);
  }
);
export const updatePost = createAsyncThunk<PostType>(
  "social/updatePost",
  async (values: any) => {
    return await axios
      .put(
        `https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/${values.id}`,
        values.data
      )
      .then((res) => res.data);
  }
);
export const deletePost = createAsyncThunk<string>(
  "social/deletePost",
  async (id) => {
    return await axios
      //@ts-ignore
      .delete(
        `https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/${id}`
      )
      .then((res) => res.data);
  }
);
export const getPost = createAsyncThunk<PostType>(
  "social/getPost",
  async (id) => {
    return await axios
      .get(
        `https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/${id}`
      )
      .then((res) => res.data);
  }
);

export const getFeed = createAsyncThunk<PostType[]>(
  "social/getFeed",
  async ({ id, offset }: any) => {
    return await axios
      .get(
        `https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/feed/${id}/${offset}`
      )
      .then((res) => res.data);
  }
);

export const like = createAsyncThunk<{ type: string; id: string }>(
  "social/like",
  async ({ id, data }: any) => {
    return await axios.put(
      `https://social-app-backend-m2ex.onrender.com/api/auth/login/api/posts/${data._id}/like`,
      {
        userId: id,
      }
    );
  }
);
