import { UserType, PostType, InitStateType, LoadingStatusEnum } from "../types";

export const initUser: UserType = {
  _id: "",
  username: "",
  email: "",
  profilePicture: "",
  coverPicture: "",
  followers: [],
  followings: [],
  isAdmin: false,
  desc: "",
  city: "",
  hometown: "",
  relationship: 1,
  friends: [],
};
export const initPostDraft: PostType = {
  userId: "",
  postPic: "",
  desc: "",
  _id: "",
  createdAt: "",
  likes: [],
  img: "",
  updatedAt: "",
};
export const initialState: InitStateType = {
  feed: {
    data: [],
    ended: false,
  },
  user: {
    data: initUser,
    posts: [],
    followers: [],
    followings: [],
  },
  currentUser: {
    data: initUser,
    posts: [],
    followers: [],
    followings: [],
    onlineFollowings: [],
    connections: [],
  },
  loadingStatus: {
    currentUser: LoadingStatusEnum.IDLE,
    user: LoadingStatusEnum.IDLE,
    feed: LoadingStatusEnum.IDLE,
    post: LoadingStatusEnum.IDLE,
  },
  currentPost: initPostDraft,
  postDraft: initPostDraft,
  searchItems: {
    users: [],
    posts: [],
  },
};
