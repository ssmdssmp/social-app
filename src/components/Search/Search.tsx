import Icon from "../ui/Icon";
import { Input } from "@mui/material";
import { Search as SeacrhIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SocialType } from "../../types";
import { searchUser, searchPost } from "../../reducers/socialSlice";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { format } from "timeago.js";
const Search = () => {
  const dispatch: any = useDispatch();
  const searchItems = useSelector(
    ({ social }: SocialType) => social.searchItems
  );
  const searchFormik = useFormik({
    initialValues: {
      search: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const author = useSelector(
    ({ social }: SocialType) => social.currentUser.connections
  );
  const navigate = useNavigate();
  return (
    <div className="w-2/4 flex justify-center items-center  gap-2 rounded-sm  ">
      <form
        onSubmit={searchFormik.handleSubmit}
        className="h-12 max-w-lg w-3/4 items-center relative  flex rounded-sm justify-between"
      >
        <Input
          color="secondary"
          name="search"
          id="search"
          autoComplete="off"
          onChange={(e) => {
            dispatch(searchUser(e.target.value));
            dispatch(searchPost(e.target.value));
            searchFormik.handleChange(e);
          }}
          sx={{
            padding: "0px 5px",
            color: "white",
            background: "transparent",
            borderBottom: "1px solid rgba(255,255,255,0.6)",
            "&::focus": {
              borderBottom: "1px solid rgba(255,255,255,1)",
            },
          }}
          disableUnderline
          value={searchFormik.values.search}
          fullWidth
          placeholder="Search for friends or posts"
        />
        <button className="bg-transparent" type="submit">
          <Icon onClick={searchFormik.handleSubmit}>
            <SeacrhIcon sx={{ filter: "invert(1)" }} />
          </Icon>
        </button>
        {searchFormik.values.search.length !== 0 && (
          <ul className="absolute bg-white max-h-80 overflow-scroll top-16 h-auto z-10 w-11/12 flex gap-1 flex-col">
            {searchItems.users.map((item) => {
              return (
                <div
                  onClick={(e) => {
                    navigate(`/person/${item._id}`);
                    searchFormik.handleReset(e);
                  }}
                >
                  <li className="h-14 cursor-pointer w-full rounded-sm gap-3  border flex justify-between items-center p-2 hover:bg-slate-100">
                    <div className="flex items-center gap-5">
                      <img
                        className="w-10 h-10 rounded-sm object-cover"
                        src={
                          process.env.PUBLIC_URL + item.profilePicture ||
                          process.env.PUBLIC_URL + "/assets/no_avatar.jpeg"
                        }
                        alt=""
                      />
                      <p className="w-32">{item.username}</p>
                    </div>
                    <div className="flex gap-1 items-center text-cyan-700">
                      <p className="text-[12px]">go to profile</p>
                      <ArrowCircleRightIcon sx={{ color: "#3B81F6" }} />
                    </div>
                  </li>
                </div>
              );
            })}
            {searchItems.posts.map((item) => {
              return (
                <li
                  onClick={(e) => {
                    navigate(`/post/${item._id}`);
                    searchFormik.handleReset(e);
                  }}
                  className="h-14 cursor-pointer w-full rounded-sm gap-3  border flex justify-between items-center p-2 hover:bg-slate-100"
                >
                  <div className="flex items-center">
                    <p className="w-32">
                      {item.desc.length > 10
                        ? item.desc.slice(0, 14) + "..."
                        : item.desc}{" "}
                    </p>
                    {item.postPic ? (
                      <img
                        className="h-10 w-10 rounded-sm"
                        src={process.env.PUBLIC_URL + item.postPic}
                        alt={"search post pic"}
                      />
                    ) : (
                      <div className="w-10 h-10"></div>
                    )}
                  </div>
                  <p className="text-sm w-4/12 whitespace-nowrap ">
                    by {author.find((el) => el._id === item.userId)?.username}{" "}
                  </p>
                  <p className="text-[10px] flex justify-self-end">
                    {format(item.createdAt)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Search;
