import CreatePost from "../CreatePost/CreatePost";
import { Button } from "@mui/material";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { SocialType } from "../../types";
import { LoadingStatusEnum } from "../../types";
import { useRef } from "react";
import { getFeed } from "../../hooks/postHooks";
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

  const scrolltoFeedTop = () => {
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
        {feed.data.map((item) => {
          return (
            <Post scrolltoFeedTop={() => scrolltoFeedTop()} settings={item} />
          );
        })}
      </ul>

      {loadingStatus.currentUser === LoadingStatusEnum.FULFILLED &&
      loadingStatus.feed === LoadingStatusEnum.PENDING ? (
        <img
          className="w-20 "
          src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
          alt=""
        />
      ) : (
        <>
          {feed.ended && <p className="text-sm text-red-400"> No more posts</p>}
          <Button
            onClick={() =>
              feed.ended
                ? scrolltoFeedTop()
                : dispatch(
                    // @ts-ignore
                    getFeed({ id: currentUser._id, offset: feed.data.length })
                  )
            }
            variant="contained"
          >
            {feed.ended ? "to top" : "load more"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Feed;
