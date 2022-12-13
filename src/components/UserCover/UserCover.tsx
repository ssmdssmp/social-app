import { useDispatch, useSelector } from "react-redux";
import { LoadingStatusEnum, SocialType } from "../../types";
import { Button } from "@mui/material";
import { followUser, unfollowUser } from "../../hooks/userHooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import { toggleFollow } from "../../reducers/socialSlice";
const UserCover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(({ social }: SocialType) => social.user.data);

  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser
  );
  const userLoadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus.user
  );
  return (
    user && (
      <div className="mt-16 flex flex-col gap-5 h-[85] ">
        {userLoadingStatus === LoadingStatusEnum.FULFILLED ? (
          <img
            className="h-64 object-cover object-center border-b-2"
            src={user.coverPicture}
            alt="userPicture"
          />
        ) : (
          <div className="h-64 w-full bg-slate-100"></div>
        )}
        <div className="w-full relative flex h-20 items-end  ">
          <div className="absolute -top-24  h-content w-full items-end  flex  justify-between">
            <div className="flex gap-3 px-10 items-end w-3/5">
              <img
                className={`rounded-full object-cover border-2 border-white h-40 w-40`}
                src={
                  userLoadingStatus === LoadingStatusEnum.FULFILLED
                    ? user.profilePicture
                    : "/assets/no_avatar.jpeg"
                }
                alt=""
              />

              <h2 className="text-2xl  h-content font-bold flex flex-col justify-end ">
                {userLoadingStatus === LoadingStatusEnum.FULFILLED ? (
                  user.username
                ) : (
                  <Skeleton width={100} />
                )}
                <span className="font-light text-[15px]">
                  {userLoadingStatus === LoadingStatusEnum.FULFILLED ? (
                    user.desc
                  ) : (
                    <Skeleton width={100} />
                  )}
                </span>
              </h2>
            </div>

            <div className="w-2/5 flex gap-8">
              {user._id === currentUser.data._id ? (
                <>
                  <Button
                    sx={{ width: "130px", height: "40px", marginBottom: 2 }}
                    variant="contained"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disableRipple
                    disableFocusRipple
                    onClick={() => {
                      !currentUser.data._id && navigate("/login");
                      if (currentUser.data.followings.includes(user._id)) {
                        dispatch(
                          //@ts-ignore
                          unfollowUser({
                            userId: user._id,
                            currentUserId: currentUser.data._id,
                          })
                        );
                      } else {
                        dispatch(
                          //@ts-ignore
                          followUser({
                            userId: user._id,
                            currentUserId: currentUser.data._id,
                          })
                        );
                      }
                      dispatch(toggleFollow(user._id));
                    }}
                    sx={{
                      width: "130px",
                      height: "40px",
                      transition: "unset",
                      background: currentUser.data.followings.includes(user._id)
                        ? "#FFF"
                        : "#3B81F6",
                      color: currentUser.data.followings.includes(user._id)
                        ? "#3B81F6"
                        : "#FFF",
                      "&:hover": {
                        background: currentUser.data.followings.includes(
                          user._id
                        )
                          ? "#FFF"
                          : "#3B81F6",
                      },
                    }}
                    variant="contained"
                  >
                    {currentUser.data.followings.includes(user._id)
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: "white",
                      color: "#3B81F6",
                      width: "130px",
                      height: "40px",
                      marginBottom: 2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Send Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCover;
