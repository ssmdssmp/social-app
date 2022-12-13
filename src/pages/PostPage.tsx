import Topbar from "../components/Topbar/Topbar";
import Navigation from "../components/Navigation/Navigation";
import Rightbar from "../components/Rightbar/Rightbar";
import CommentIcon from "@mui/icons-material/Comment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../hooks/postHooks";
import { LoadingStatusEnum, SocialType } from "../types";
import Post from "../components/Post/Post";
const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getPost(id));
  }, []);
  const currentPost = useSelector(
    ({ social }: SocialType) => social.currentPost
  );
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );

  return (
    <div>
      <Topbar />
      <div className="flex h-screen justify-center overflow-hidden w-full">
        <Navigation />
        <div className="w-7/12 bg-slate-100 flex  flex-col overflow-scroll mt-16 items-center gap-5 py-5">
          <div className="h-max w-10/12 gap-5 flex flex-col items-center">
            {loadingStatus.post === LoadingStatusEnum.FULFILLED &&
            loadingStatus.currentUser === LoadingStatusEnum.FULFILLED ? (
              <Post isPostPage settings={currentPost}></Post>
            ) : (
              <img className="w-20" src="/assets/spinner.svg" alt="loader" />
            )}
            <div className="flex flex-col gap-3 w-full max-w-xl">
              <h3 className="font-bold">Comments</h3>
              <div className="w-full bg-white h-28 shadow-lg flex ">
                <div className="flex flex-col items-center w-full justify-center gap-2">
                  <CommentIcon
                    sx={{ height: "35px", width: "35px", opacity: "0.5" }}
                  />
                  <p className="text-sm">There no comments yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

export default PostPage;
