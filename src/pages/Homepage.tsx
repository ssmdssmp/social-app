import Topbar from "../components/Topbar/Topbar";
import Navigation from "../components/Navigation/Navigation";
import Feed from "../components/Feed/Feed";
import Rightbar from "../components/Rightbar/Rightbar";
import { useSelector } from "react-redux";
import { SocialType } from "../types";
import { useEffect } from "react";

const Homepage = () => {
  return (
    <div>
      <Topbar />
      <div className="flex h-screen justify-center  w-full">
        <Navigation />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Homepage;
