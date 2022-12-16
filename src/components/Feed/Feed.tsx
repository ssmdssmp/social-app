import { Link } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import { Button } from "@mui/material";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { SocialType } from "../../types";
import { LoadingStatusEnum } from "../../types";
import { useRef } from "react";
import { getFeed } from "../../hooks/postHooks";
import { nanoid } from "@reduxjs/toolkit";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PersonIcon from "@mui/icons-material/Person";
const Feed = () => {
  const dispatch = useDispatch();
  const feedRef = useRef(null);
  const feed = useSelector(({ social }: SocialType) => social.feed);
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );

  const scrollToFeedTop = () => {
    //@ts-ignore
    feedRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const updateOnScroll = (e: any) => {
    //@ts-ignore

    if (
      e.target.scrollHeight - e.target.scrollTop - 10 <=
        e.target.getBoundingClientRect().height &&
      loadingStatus.feed !== LoadingStatusEnum.PENDING &&
      feed.ended !== true
    ) {
      //@ts-ignore
      dispatch(getFeed({ id: currentUser._id, offset: feed.data.length }));
    }
  };

  return (
    <div
      onScroll={(e) => updateOnScroll(e)}
      ref={feedRef}
      className=" relative h-auto gap-5 mt-16 w-full flex flex-col sm:w-7/12  items-center bg-slate-100 overflow-scroll p-5"
    >
      <CreatePost />
      <ul className="w-4/5 h-auto flex flex-col items-center gap-5">
        {loadingStatus.feed === LoadingStatusEnum.PENDING && (
          <img
            className="w-20 "
            src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
            alt=""
          />
        )}
        {currentUser._id === "" && (
          <div className="flex flex-col items-center gap-2">
            <PersonIcon sx={{ width: "50px", height: "50px" }} />
            <p className="text-sm text-slate-600">
              You need to be logged in to see feed
            </p>
            <Link to="/login">
              <Button variant="contained"> Login</Button>
            </Link>
          </div>
        )}
        {feed.data.length === 0 && currentUser._id !== "" && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <DynamicFeedIcon sx={{ width: "50px", height: "50px" }} />

            <p className="text-sm text-slate-600">
              Follow someone or create post to see feed
            </p>
          </div>
        )}
        {feed.data.map((item) => {
          return (
            <Post
              key={nanoid()}
              scrolltoFeedTop={() => scrollToFeedTop()}
              settings={item}
            />
          );
        })}
      </ul>
      {loadingStatus.currentUser === LoadingStatusEnum.FULFILLED &&
        loadingStatus.feed === LoadingStatusEnum.PENDING && (
          <img
            className="w-20 "
            src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
            alt=""
          />
        )}
      {feed.ended && (
        <>
          <p className="text-sm text-red-400"> No more posts</p>
          <Button variant="contained" onClick={() => scrollToFeedTop()}>
            to top
          </Button>
        </>
      )}
    </div>
  );
};

export default Feed;
