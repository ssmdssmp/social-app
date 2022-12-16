import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatusEnum } from "../types/index";
import {
  getFeed,
  createPost,
  deletePost,
  updatePost,
  getPost,
} from "../hooks/postHooks";
import {
  followUser,
  unfollowUser,
  login,
  getUser,
  getUserPosts,
  registration,
} from "../hooks/userHooks";
import { initialState, initPostDraft, initUser } from "./init";

const socialSlice = createSlice({
  name: "socail",
  initialState,
  reducers: {
    editPost: (state, { payload }) => {
      state.postDraft = payload;
    },
    clearPostDraft: (state) => {
      state.postDraft = initPostDraft;
    },
    deleteImage: (state) => {
      state.postDraft.postPic = "";
    },
    toggleFollow: (state, { payload }: { payload: string }) => {
      if (state.currentUser.data.followings.includes(payload)) {
        state.currentUser.data.followings =
          state.currentUser.data.followings.filter((el) => el !== payload);
      } else {
        state.currentUser.data.followings.push(payload);
      }
    },
    logout: (state) => {
      state.currentUser.data = initUser;
      state.currentUser.posts = [];
      state.currentUser.followers = [];
      state.currentUser.followings = [];

      state.loadingStatus.currentUser = LoadingStatusEnum.IDLE;
    },
    setOnlineFollowings: (state, { payload }: { payload: string[] }) => {
      state.currentUser.onlineFollowings = [
        ...state.currentUser.followings.filter((el) =>
          payload.includes(el._id)
        ),
      ];
    },

    searchUser: (state, { payload }: { payload: string }) => {
      if (payload.length !== 0) {
        state.searchItems.users = state.currentUser.connections
          .filter((el) =>
            el.username.toLowerCase().includes(payload.toLowerCase())
          )
          .filter(
            (item1, index, arr) =>
              arr.findIndex((item2) => item2._id === item1._id) === index
          );
      } else {
        state.searchItems.users = [];
      }
    },
    searchPost: (state, { payload }: { payload: string }) => {
      if (payload.length !== 0) {
        state.searchItems.posts = state.feed.data.filter((el) =>
          el.desc.toLowerCase().includes(payload.toLowerCase())
        );
      } else {
        state.searchItems.posts = [];
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user.data = payload.user;
        state.user.posts.data = payload.userPosts;
        state.user.followings = payload.followings;
        state.user.followers = payload.followers;
        state.loadingStatus.user = LoadingStatusEnum.FULFILLED;
        state.user.posts.ended = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user.data = initUser;
        state.loadingStatus.user = LoadingStatusEnum.REJECTED;
      })
      .addCase(getUser.pending, (state) => {
        state.loadingStatus.user = LoadingStatusEnum.PENDING;
      })
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        state.user.posts.data = state.user.posts.data.concat(payload);
        if (payload.length < 5) {
          state.user.posts.ended = true;
        }
        state.loadingStatus.user = LoadingStatusEnum.FULFILLED;
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.loadingStatus.user = LoadingStatusEnum.REJECTED;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loadingStatus.user = LoadingStatusEnum.PENDING;
      })

      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.loadingStatus.post = LoadingStatusEnum.FULFILLED;
      })
      .addCase(getPost.rejected, (state) => {
        state.loadingStatus.post = LoadingStatusEnum.REJECTED;
        state.currentPost = initPostDraft;
      })
      .addCase(getPost.pending, (state) => {
        state.loadingStatus.post = LoadingStatusEnum.PENDING;
      })
      .addCase(login.pending, (state) => {
        state.loadingStatus.currentUser = LoadingStatusEnum.PENDING;
        state.loadingStatus.feed = LoadingStatusEnum.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentUser.data = payload.user;
        state.currentUser.posts = payload.userPosts;
        state.feed.data = payload.feed;
        state.currentUser.followers = payload.followers;
        state.currentUser.followings = payload.followings;
        state.loadingStatus.currentUser = LoadingStatusEnum.FULFILLED;
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
        state.currentUser.connections = [
          ...payload.followers.concat(payload.followings),
          state.currentUser.data,
        ];
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.currentUser.data = payload.user;
        state.currentUser.posts = payload.userPosts;
        state.feed.data = payload.feed;
        state.currentUser.followers = payload.followers;
        state.currentUser.followings = payload.followings;
        state.loadingStatus.currentUser = LoadingStatusEnum.FULFILLED;
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
        state.currentUser.connections = [
          ...payload.followers.concat(payload.followings),
          state.currentUser.data,
        ];
      })
      .addCase(registration.pending, (state) => {
        state.loadingStatus.currentUser = LoadingStatusEnum.PENDING;
      })
      .addCase(registration.rejected, (state) => {
        state.loadingStatus.currentUser = LoadingStatusEnum.REJECTED;
      })
      .addCase(login.rejected, (state) => {
        state.currentUser.data = initUser;
        state.loadingStatus.currentUser = LoadingStatusEnum.REJECTED;
        state.loadingStatus.feed = LoadingStatusEnum.REJECTED;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
        if (state.feed.data.length === 0) {
          state.feed.data = payload;
        } else {
          state.feed.data = state.feed.data.concat(payload);
        }
        if (payload.length < 5) {
          state.feed.ended = true;
        }
      })
      .addCase(getFeed.rejected, (state) => {
        state.feed.data = [];
        state.loadingStatus.feed = LoadingStatusEnum.REJECTED;
      })
      .addCase(getFeed.pending, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.PENDING;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.feed.data.unshift(payload);
        state.currentUser.posts.unshift(payload);
        if (state.user.data._id === state.currentUser.data._id) {
          state.user.posts.data.unshift(payload);
        }
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
      })
      .addCase(createPost.pending, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.PENDING;
      })
      .addCase(createPost.rejected, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.REJECTED;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.feed.data = state.feed.data.filter((el) => el._id !== payload);
        state.currentUser.posts.filter((el) => el._id !== payload);
        if (state.currentUser.data._id === state.user.data._id) {
          state.user.posts.data = state.user.posts.data.filter(
            (el) => el._id !== payload
          );
        }
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
      })
      .addCase(deletePost.pending, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.PENDING;
      })
      .addCase(deletePost.rejected, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.REJECTED;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.feed.data = [
          payload,
          ...state.feed.data.filter((el) => el._id !== payload._id),
        ];
        state.currentUser.posts = [
          payload,
          ...state.currentUser.posts.filter((el) => el._id !== payload._id),
        ];
        state.user.posts.data = [
          payload,
          ...state.user.posts.data.filter((el) => el._id !== payload._id),
        ];

        state.postDraft = initPostDraft;
        state.loadingStatus.feed = LoadingStatusEnum.FULFILLED;
      })
      .addCase(updatePost.pending, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.PENDING;
      })
      .addCase(updatePost.rejected, (state) => {
        state.loadingStatus.feed = LoadingStatusEnum.REJECTED;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.user.followers = payload;
      })
      .addCase(followUser.pending, (state) => {})
      .addCase(followUser.rejected, (state) => {})
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.user.followers = payload;
      });
  },
});
export const {
  editPost,
  deleteImage,
  setOnlineFollowings,
  clearPostDraft,
  toggleFollow,
  logout,
  searchUser,
  searchPost,
} = socialSlice.actions;
export default socialSlice.reducer;
