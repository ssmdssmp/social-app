import { useFormik } from "formik";
import { loginvalidationSchema } from "./validationSchema";
import { Button } from "@mui/material";
import { WhiteBorderTextField } from "../ui/WhiteBorderTextField";
import { login } from "../../hooks/userHooks";
import { useDispatch, useSelector } from "react-redux";
import { SocialType } from "../../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadingStatusEnum } from "../../types";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginvalidationSchema,
    onSubmit: (values) => {
      //@ts-ignore
      dispatch(login(values));
      localStorage.setItem("currentUser", JSON.stringify(values));
    },
  });
  useEffect(() => {
    if (loadingStatus.currentUser === LoadingStatusEnum.FULFILLED) {
      navigate("/feed");
    }
  }, [loadingStatus.currentUser]);
  return (
    <form
      className={`flex flex-col items-center justify-between gap-3`}
      onSubmit={loginFormik.handleSubmit}
    >
      <WhiteBorderTextField
        fullWidth
        id="email"
        name="email"
        value={loginFormik.values.email}
        onChange={loginFormik.handleChange}
        // @ts-ignore
        error={loginFormik.touched.email && loginFormik.errors.email}
        helperText={loginFormik.touched.email && loginFormik.errors.email}
        placeholder="Email"
      />
      <WhiteBorderTextField
        fullWidth
        id="password"
        type="password"
        name="password"
        value={loginFormik.values.password}
        onChange={loginFormik.handleChange}
        // @ts-ignore
        error={loginFormik.touched.password && loginFormik.errors.password}
        helperText={loginFormik.touched.password && loginFormik.errors.password}
        placeholder="Password"
      />
      <Button
        type="submit"
        sx={{
          backgroundColor: "rgb(0,132,199)",
          width: "100%",

          height: "45px",
        }}
        variant="contained"
      >
        Login
      </Button>
      {loadingStatus.currentUser === LoadingStatusEnum.REJECTED && (
        <p className="text-[12px] text-red-400">Wrong email or password.</p>
      )}
      <div className="text-[12px] underline opacity-60 mt-2 cursor-pointer">
        Forgot password?
      </div>
    </form>
  );
};

export default LoginForm;
