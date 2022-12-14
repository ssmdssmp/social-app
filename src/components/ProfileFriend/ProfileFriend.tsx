import { UserType } from "../../types";
import { Link } from "react-router-dom";

const ProfileFriend = ({
  settings,
  scrollToTop,
}: {
  settings: UserType;
  scrollToTop: Function;
}) => {
  return (
    <Link onClick={() => scrollToTop()} to={`/person/${settings._id}`}>
      <li className="flex cursor-pointer w-20 flex-col gap-1 items-center">
        <img
          className="h-20 w-20 object-cover rounded-md "
          src={process.env.PUBLIC_URL + settings.profilePicture}
          alt=""
        />
        <p className="text-sm whitespace-nowrap">{settings.username}</p>
      </li>
    </Link>
  );
};

export default ProfileFriend;
// import { UserType } from "../types";
// const ProfileFriend = ({ settings }: { settings: UserType }) => {
//   return (
//
//   );
// };
// export const ProfileFriend;
