export enum RelationshipEnum {
  SINGLE,
  IN_SEARCH,
  IN_RELATIONS,
}
export enum LoadingStatusEnum {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED,
}

export type UserType = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  desc: string;
  city: string;
  hometown: string;
  relationship: RelationshipEnum;
  friends: UserType[];
  onlineFollowings?: [];
};

export type PostType = {
  _id: string;
  createdAt: string;
  userId: string;
  desc: string;
  postPic: string;
  likes: string[];
  img: string;
  updatedAt?: string;
};

export type InitStateType = {
  feed: {
    data: PostType[];
    ended: boolean;
  };
  user: {
    data: UserType;
    posts: PostType[];
    followers: UserType[];
    followings: UserType[];
  };
  currentUser: {
    data: UserType;
    posts: PostType[];
    followers: UserType[];
    followings: UserType[];
    onlineFollowings: UserType[];
    connections: UserType[];
  };
  loadingStatus: {
    currentUser: LoadingStatusEnum;
    user: LoadingStatusEnum;
    feed: LoadingStatusEnum;
    post: LoadingStatusEnum;
  };
  postDraft: PostType;
  searchItems: {
    users: UserType[];
    posts: PostType[];
  };
  currentPost: PostType;
};

export type UserDataType = {
  user: UserType;
  userPosts: PostType[];
  followings: UserType[];
  followers: UserType[];
};
export interface LoginDataType extends UserDataType {
  feed: PostType[];
}
export type CreatePostType = {
  userId: string;
  desc: string;
  postPic: string;
};
export type SocialType = {
  social: InitStateType;
};
