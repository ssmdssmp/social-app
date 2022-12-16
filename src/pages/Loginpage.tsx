import { Button } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocialType } from "../types";
import { useEffect, useRef, useState } from "react";
import { LoadingStatusEnum } from "../types";
import RegistrationForm from "../components/Forms/RegistrationForm";
import { Transition } from "react-transition-group";
const Loginpage = () => {
  const navigate = useNavigate();
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );

  const [isOpenRegForm, setIsOpenRegForm] = useState(false);
  const defaultStyleWrapper = {
    opacity: 0,
    height: "100vh",
    overflow: "hidden",
    transition: "opacity 0.2s ease-in-out",
    display: "none",
  };
  const transitionStylesWrapper = {
    entering: { opacity: 0, display: "block" },
    entered: { opacity: 0.7, display: "block" },
    exiting: { opacity: 0.7, display: "block" },
    exited: { opacity: 0, display: "none" },
  };
  const defaultStylePopup = {
    bottom: "-200vh",
    position: "absolute",
    zIndex: 30,
    transition: "bottom 0.3s ease-in-out",
  };
  const transitionStylesPopop = {
    entering: { bottom: "-200vh" },
    entered: { bottom: "15vh" },
    exiting: { bottom: "15vh" },
    exited: { bottom: "-200vh" },
  };
  return (
    <Transition timeout={0} in={isOpenRegForm}>
      {(state) => (
        <div className="w-screen h-screen flex flex-col justify-center gap-10 items-center bg-slate-100 md:flex-row md:gap-16 md:justify-center md:items-center ">
          <div
            onClick={() => setIsOpenRegForm(false)}
            style={{
              ...defaultStyleWrapper,
              // @ts-ignore
              ...transitionStylesWrapper[state],
            }}
            className="absolute opacity-70 z-30 h-screen w-screen bg-slate-100"
          ></div>
          <Transition timeout={0} in={isOpenRegForm}>
            {(state) => (
              <div
                style={{
                  ...defaultStylePopup,
                  // @ts-ignore
                  ...transitionStylesPopop[state],
                }}
              >
                <RegistrationForm />
              </div>
            )}
          </Transition>
          <div className="  flex items-center justify-center  h-[400px] flex-col gap-8">
            <h1 className="text-[55px] text-sky-600">React.Social</h1>
            <div className="flex flex-col  gap-8 items-center ">
              <div className="flex gap-5">
                <div className="flex  gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-slate-500">
                      Test <span className="text-sky-500"> User 1</span>
                    </p>
                    <div className="flex flex-col gap-2 ">
                      <div className="flex gap-2 items-center">
                        <p className="text-sm text-slate-500">email:</p>{" "}
                        <p className="text-sm text-sky-500">
                          sfasfa22qq244@gmail.com
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sm text-slate-500">password:</p>{" "}
                        <p className="text-sm text-sky-500">155w123q1111q</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex  gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-slate-500">
                      Test <span className="text-red-400"> User 1</span>
                    </p>
                    <div className="flex flex-col gap-2 ">
                      <div className="flex gap-2 items-center">
                        <p className="text-sm text-slate-500">email:</p>{" "}
                        <p className="text-sm text-red-400">
                          qwerty123@gmail.com
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-sm text-slate-500">password:</p>{" "}
                        <p className="text-sm text-red-400">1213141516</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                To test websocket, connect with two accounts
              </p>
            </div>
          </div>
          <div className=" w-[450px] min-w-[350px] flex shadow-lg  flex-col p-10 justify-center gap-3 bg-white h-[380px] rounded-xl relative">
            <LoginForm />
            {loadingStatus.currentUser === LoadingStatusEnum.PENDING && (
              <div className="w-full flex justify-center h-10">
                <img
                  className="w-10"
                  src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
                  alt="spinner"
                />
              </div>
            )}
            <hr />
            <div className="w-full h-full flex items-end">
              <Button
                onClick={() => setIsOpenRegForm(!isOpenRegForm)}
                sx={{
                  height: "45px",
                  background: "rgb(66,183,41)",
                  width: "100%",
                }}
                variant="contained"
              >
                Create account
              </Button>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Loginpage;
