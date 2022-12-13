import ListIcon from "@mui/icons-material/List";
import { PostType, SocialType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import styled from "styled-components";
import { deletePost, like } from "../../hooks/postHooks";
import { editPost } from "../../reducers/socialSlice";
import { useEffect, useState } from "react";
const StyledSelect = styled(Select)`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
const Post = ({
  settings,
  isProfile,
  isPostPage,
  scrolltoFeedTop,
  scrollToProfileTop,
}: {
  settings: PostType;
  isProfile?: boolean;
  isPostPage?: boolean;
  scrolltoFeedTop?: Function;
  scrollToProfileTop?: Function;
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );
  const author = useSelector(({ social }: SocialType) =>
    isProfile
      ? social.user.data
      : social.currentUser.connections.find((el) => el._id === settings.userId)
  );

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [likes, setLikes] = useState(settings.likes);
  useEffect(() => {
    setLikes(settings.likes);
  }, [settings.likes]);
  return (
    <div
      className={
        settings.postPic !== ""
          ? "p-5 bg-white shadow-lg h-fit overflow-hidden rounded-md flex max-h-[600px] border  flex-col w-full gap-4 max-w-xl min-w-[320px]"
          : "p-5 bg-white shadow-lg h-fit overflow-hidden rounded-md flex max-h-[300px] border  flex-col w-full gap-4 max-w-xl min-w-[320px]"
      }
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 w-4/5">
          <div className="flex flex-col ">
            {author && (
              <Link
                onClick={() => {
                  // scrollToProfileTop && scrollToProfileTop();
                }}
                to={`/person/${author._id}`}
              >
                <div className="flex h-11 cursor-pointer items-center gap-2 hover:bg-slate-100">
                  <img
                    className="rounded-full h-9 w-9 object-cover "
                    src={author.profilePicture}
                    alt=""
                  />
                  <div>
                    <p>{author.username}</p>
                    <div className="flex gap-2">
                      <p className="text-[11px] opacity-40 ">
                        {format(settings.createdAt)}
                      </p>
                      {settings.updatedAt && (
                        <p className="text-[11px] opacity-40 text-purple-400 ">
                          {format(settings.updatedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="cursor-pointer">
          <StyledSelect
            onClick={() => setIsOpenOptions((value) => !value)}
            IconComponent={ListIcon}
            open={isOpenOptions}
          >
            <MenuItem
              onClick={(e) => {
                if (currentUser._id === settings.userId) {
                  dispatch(editPost(settings));
                  scrolltoFeedTop && scrolltoFeedTop();
                  scrollToProfileTop && scrollToProfileTop();
                } else {
                  alert("you can edit only your posts");
                }
              }}
            >
              {currentUser._id && "Edit"}
            </MenuItem>

            <MenuItem
              onClick={() => {
                if (currentUser._id === settings.userId) {
                  dispatch(
                    //@ts-ignore
                    deletePost(settings._id)
                  );
                  // scrolltoFeedTop && scrolltoFeedTop();
                  // scrollToProfileTop && scrollToProfileTop();
                } else {
                  alert("you can delete only your posts");
                }
              }}
            >
              {currentUser._id && "Delete"}
            </MenuItem>
          </StyledSelect>
        </div>
      </div>
      <div className=" flex flex-col w-full gap-2 rounded-md">
        <p className="px-3 relative">{settings.desc}</p>
        {settings.postPic && (
          <img
            className="max-h-[500px] w-full object-contain rounded-md"
            src={settings.postPic}
            alt=""
          />
        )}
      </div>
      <div className="flex w-full px-2 justify-between">
        <div
          onClick={() => {
            if (likes.includes(currentUser._id)) {
              setLikes((likes) => likes.filter((el) => el !== currentUser._id));
            } else {
              setLikes((likes) => [...likes, currentUser._id]);
            }
            console.log(likes);
            //@ts-ignore
            dispatch(like({ id: currentUser._id, data: settings }));
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="h-6" src="/assets/heart.png" alt="" />
          <p className="text-[13px]">{likes.length} people like it</p>
        </div>
        {!isPostPage && (
          <Link to={`/post/${settings._id}`}>
            <p className="cursor-pointer underline text-sm">Comments</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Post;
