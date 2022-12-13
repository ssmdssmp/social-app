import { useSelector } from "react-redux";
import { SocialType } from "../../types";
import Ad from "../Ad/Ad";

import OnlineFriends from "../OnlineFriends/OnlineFriends";
const Rightbar = () => {
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser
  );
  return (
    <div className="w-3/12 p-5 bg-slate-50 flex-col items-center h-84 overflow-scroll hidden md:flex">
      <div className="mt-16 flex flex-col gap-5">
        <Ad />
        {currentUser.data._id !== "" && <OnlineFriends />}
      </div>
    </div>
  );
};

export default Rightbar;
