import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingStatusEnum, SocialType } from "../../types";

const UserInfo = () => {
  const user = useSelector(({ social }: SocialType) => social.user.data);
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus.user
  );
  return (
    user && (
      <div>
        <h3 className="font-bold ml-2">User information</h3>

        <ul className="flex mt-2 flex-col gap-2 bg-white w-9/12 shadow-md rounded-md p-2 border ">
          <li className="flex gap-2">
            City:
            {loadingStatus === LoadingStatusEnum.FULFILLED ? (
              <span>{user.city}</span>
            ) : (
              <Skeleton width={100} />
            )}
          </li>
          <li className="flex gap-2">
            From:
            {loadingStatus === LoadingStatusEnum.FULFILLED ? (
              <span>{user.hometown}</span>
            ) : (
              <Skeleton width={100} />
            )}
          </li>
          <li className="flex gap-2">
            Relationship:
            {loadingStatus === LoadingStatusEnum.FULFILLED ? (
              <span>{user.city}</span>
            ) : (
              <Skeleton width={100} />
            )}
          </li>
        </ul>
      </div>
    )
  );
};

export default UserInfo;
