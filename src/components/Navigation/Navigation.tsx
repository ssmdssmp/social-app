import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { SocialType, UserType } from "../../types";
const Navigation = () => {
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser
  );
  const NavigationItem = ({ navItem }: { navItem: string }) => {
    return (
      <Link to="/feed">
        <li className="h-12 w-full flex p-5 cursor-pointer border-b border-grey-100  hover:bg-slate-100  items-center">
          {navItem && navItem}
        </li>
      </Link>
    );
  };
  const NavigationFriend = ({ settings }: { settings: UserType }) => {
    return (
      <Link to={`/person/${settings._id}`}>
        <div className="flex h-11 cursor-pointer items-center gap-2 px-4 hover:bg-slate-100">
          <img
            className="rounded-full h-9 w-9 object-cover "
            src={process.env.PUBLIC_URL + settings.profilePicture}
            alt=""
          />
          <p>{settings.username}</p>
        </div>
      </Link>
    );
  };

  const navItems: string[] = [
    "Feed",
    "Chats",
    "Videos",
    "Groups",
    "Bookmarks",
    "Questions",
    "Jobs",
    "Events",
    "Courses",
  ];
  return (
    <div className="  w-1/5 h-84 h-screen shadow-xl overflow-scroll hidden sm:block">
      <div className=" relative  mt-16  flex flex-col gap-5">
        <ul>
          {navItems.map((navItem) => {
            return <NavigationItem key={nanoid()} navItem={navItem} />;
          })}
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-1 py-2">
          {currentUser.followings.map((item) => {
            return <NavigationFriend key={nanoid()} settings={item} />;
          })}
        </ul>
        <button></button>
      </div>
    </div>
  );
};
export default Navigation;
