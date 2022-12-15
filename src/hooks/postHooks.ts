import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../types";
import axios from "axios";
export const createPost = createAsyncThunk<PostType>(
  "social/createPost",
  (values) => {
    return axios
      .post("https://social-app-backend-m2ex.onrender.com/api/posts/", values)
      .then((res) => res.data);
  }
);
export const updatePost = createAsyncThunk<PostType>(
  "social/updatePost",
  (values: any) => {
    return axios
      .put(
        `https://social-app-backend-m2ex.onrender.com/api/posts/${values.id}`,
        values.data
      )
      .then((res) => res.data);
  }
);
export const deletePost = createAsyncThunk<string>(
  "social/deletePost",
  (id) => {
    return (
      axios
        //@ts-ignore
        .delete(`https://social-app-backend-m2ex.onrender.com/api/posts/${id}`)
        .then((res) => res.data)
    );
  }
);
export const getPost = createAsyncThunk<PostType>("social/getPost", (id) => {
  return axios
    .get(`https://social-app-backend-m2ex.onrender.com/api/posts/${id}`)
    .then((res) => res.data);
});

export const getFeed = createAsyncThunk<PostType[]>(
  "social/getFeed",
  ({ id, offset }: any) => {
    return axios
      .get(
        `https://social-app-backend-m2ex.onrender.com/api/posts/feed/${id}/${offset}`
      )
      .then((res) => res.data);
  }
);

export const like = createAsyncThunk<{ type: string; id: string }>(
  "social/like",
  ({ id, data }: any) => {
    return axios.put(
      `https://social-app-backend-m2ex.onrender.com/api/posts/${data._id}/like`,
      {
        userId: id,
      }
    );
  }
);
