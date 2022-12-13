import Topbar from "../components/Topbar/Topbar";
import Navigation from "../components/Navigation/Navigation";
import Feed from "../components/Feed/Feed";
import Rightbar from "../components/Rightbar/Rightbar";
import { useSelector } from "react-redux";
import { SocialType } from "../types";

const Homepage = () => {
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );
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
