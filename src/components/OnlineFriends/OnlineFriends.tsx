import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SocialType, UserType } from "../../types";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { setOnlineFollowings } from "../../reducers/socialSlice";
import { useDispatch } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
const OnlineFriends = () => {
  const dispatch: Function = useDispatch();
  const socketRef = useRef(null as any);
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser
  );
  useEffect((): any => {
    if (socketRef.current == null) {
      socketRef.current = io("https://social-app-socket.onrender.com", {
        transports: ["websocket"],
      });
    }
    const { current: socket } = socketRef;

    socket.open();

    socket.on("ping", (data: string[]) => {
      //@ts-ignore
      dispatch(setOnlineFollowings(data));
      socket.emit("pong", {
        _id: currentUser.data._id,
        followings: currentUser.data.followings,
      });
      // setOnlineFollowings(data);
    });

    return () => {
      socket.off("connected");
      socket.off("ping");
      socket.close();
      socket.disconnect();
    };
  }, []);
  const OnlineFriend = ({ settings }: { settings: UserType }) => {
    return (
      <Link to={`/person/${settings._id}`}>
        <li className="flex gap-1 relative hover:bg-slate-100 py-1 ">
          <div>
            <img
              className="  w-9 h-9 object-cover rounded-full"
              src={
                process.env.PUBLIC_URL + settings.profilePicture ||
                process.env.PUBLIC_URL + "/assets/no_avatar.jpeg"
              }
              alt=""
            />
            <span className="absolute rounded-full w-3 h-3 bg-green-500 top-0 left-6"></span>
          </div>
          <p className="font-normal">{settings.username}</p>
        </li>
      </Link>
    );
  };
  return (
    <div className="flex w-full font-bold flex-col gap-3">
      <h3 className="ml-3">Online friends</h3>
      <ul className="flex flex-col gap-4 bg-white border rounded-md shadow-md p-3">
        {currentUser.onlineFollowings.map((item) => {
          return <OnlineFriend settings={item} />;
        })}
        {currentUser.onlineFollowings.length === 0 && (
          <div className="flex gap-3 opacity-40 pl-1">
            <p>No friends online</p>
            <GroupIcon />
          </div>
        )}
      </ul>
    </div>
  );
};
export default OnlineFriends;
