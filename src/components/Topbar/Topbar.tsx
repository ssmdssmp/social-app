import { Select } from "@mui/material";
import { Person, Chat, Notifications } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Icon from "../ui/Icon";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SocialType } from "../../types";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { logout } from "../../reducers/socialSlice";
import Search from "../Search/Search";
const Topbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );
  const feed = useSelector(({ social }: SocialType) => social.feed);
  const [isOpenUserSelect, setIsOpenUserSelect] = useState(false);
  const StyledUserSelect = styled(Select)`
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
      padding-right: unset;
      visibility:hidden;
      width:0;
    }
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
      width: 10;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
    .
  `;
  return (
    <div className="fixed z-10  top-0 justify-between p-5 flex items-center w-full bg-blue-500 h-16 ">
      <div className="cursor-pointer hover:text-white">
        <Link to="/feed">
          <h1 className="text-white md:text-2xl sm:text-sm">React.Social</h1>
        </Link>
      </div>
      <Search />
      {window.innerWidth > 600 && (
        <Link to="/feed">
          <Button
            sx={{
              padding: "4px 12px",
              background: "sky",
              whiteSpace: "nowrap",
            }}
            variant="contained"
          >
            <AddIcon />
            Create Post
          </Button>
        </Link>
      )}
      <div className="flex w-64 justify-between items-center">
        <div className="flex gap-2 ">
          <Link to={currentUser._id ? `/person/${currentUser._id}` : "/login"}>
            <Icon>
              <Person sx={{ filter: "invert(1)" }} />
            </Icon>
          </Link>

          <Icon>
            <Chat sx={{ filter: "invert(1)" }} />
          </Icon>

          <Icon>
            <Notifications sx={{ filter: "invert(1)" }} />
          </Icon>
        </div>
        <StyledUserSelect
          onClick={() => setIsOpenUserSelect((value) => !value)}
          placeholder={currentUser.username}
          open={isOpenUserSelect}
          IconComponent={() => {
            return (
              <div className=" cursor-pointer  h-10 w-fit flex justify-center items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={currentUser.profilePicture || "/assets/no_avatar.jpeg "}
                  alt="profilepic"
                />
              </div>
            );
          }}
        >
          <MenuItem>Settings</MenuItem>
          <Link
            to="/login"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <MenuItem>Logout</MenuItem>
          </Link>
        </StyledUserSelect>
      </div>
    </div>
  );
};
export default Topbar;
