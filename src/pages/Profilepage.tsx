import Topbar from "../components/Topbar/Topbar";
import Navigation from "../components/Navigation/Navigation";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/Post/Post";
import UserCover from "../components/UserCover/UserCover";
import UserInfo from "../components/UserInfo/UserInfo";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { LoadingStatusEnum, SocialType, UserType } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import ProfileFriend from "../components/ProfileFriend/ProfileFriend";
import { getUser, getUserPosts } from "../hooks/userHooks";
import { Button, Skeleton } from "@mui/material";

const Profilepage = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ social }: SocialType) => social.user);

  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );
  const currentUserId = useSelector(
    ({ social }: SocialType) => social.currentUser.data._id
  );
  const { id } = useParams();
  useEffect(() => {
    //@ts-ignore
    dispatch(getUser(id));
  }, [id]);
  const profilePageRef = useRef(null);
  const scrollToProfileTop = () => {
    //@ts-ignore
    profilePageRef.current.scrollTo({
      top: 16,
      behavior: "smooth",
    });
  };
  const updateOnScroll = (e: any) => {
    //@ts-ignore

    if (
      e.target.scrollHeight - e.target.scrollTop - 10 <=
        e.target.getBoundingClientRect().height &&
      loadingStatus.user !== LoadingStatusEnum.PENDING &&
      user.posts.data.length >= 5 &&
      user.posts.ended !== true
    ) {
      dispatch(
        //@ts-ignore
        getUserPosts({ id: user.data._id, offset: user.posts.data.length })
      );
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Topbar />
      <Navigation />
      <div
        ref={profilePageRef}
        onScroll={(e) => updateOnScroll(e)}
        className="w-4/5 overflow-scroll"
      >
        <UserCover />
        <div className="flex  bg-slate-100 pt-5">
          <div className="w-3/5 gap-5 flex flex-col items-center pb-5">
            {id === currentUserId && <CreatePost />}
            <ul className="flex flex-col gap-5 w-full items-center">
              {loadingStatus.user === LoadingStatusEnum.PENDING ? (
                <img
                  className="h-20"
                  src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
                  alt="loader"
                />
              ) : (
                user.posts.data.map((item) => {
                  return (
                    <Post
                      isProfile
                      key={item._id}
                      settings={item}
                      scrollToProfileTop={() => scrollToProfileTop()}
                    />
                  );
                })
              )}
            </ul>
            {user.posts.ended && user.posts.data.length > 5 && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-red-400"> No more posts</p>
                <Button
                  onClick={() => scrollToProfileTop()}
                  variant="contained"
                >
                  To top
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 w-2/5">
            <UserInfo />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold ml-2">Followings</h3>
              <ul className="flex flex-wrap gap-7 bg-white w-9/12 justify-start rounded-md shadow-md border p-5">
                {loadingStatus.user === LoadingStatusEnum.FULFILLED
                  ? user.followings.map((item) => {
                      return (
                        <ProfileFriend
                          scrollToTop={() => scrollToProfileTop()}
                          key={nanoid()}
                          settings={item}
                        />
                      );
                    })
                  : [1, 2, 3, 4, 5, 6].map((item) => (
                      <Skeleton key={nanoid()} height={"80px"} width={"80px"} />
                    ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 pb-3">
              <h3 className="font-bold ml-2">Followers</h3>
              <ul className="flex flex-wrap gap-7 bg-white w-9/12 justify-start rounded-md shadow-md border p-5">
                {loadingStatus.user === LoadingStatusEnum.FULFILLED
                  ? user.followers.map((item: UserType) => {
                      return (
                        <ProfileFriend
                          scrollToTop={() => scrollToProfileTop()}
                          key={nanoid()}
                          settings={item}
                        />
                      );
                    })
                  : [1, 2, 3, 4, 5, 6].map((item) => (
                      <Skeleton key={nanoid()} height={"80px"} width={"80px"} />
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
