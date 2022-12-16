import { Button } from "@mui/material";
import { useFormik } from "formik";
import { WhiteBorderTextField } from "../ui/WhiteBorderTextField";
import { registration } from "../../hooks/userHooks";
import { useDispatch, useSelector } from "react-redux";
import { registrationValidationSchema } from "./validationSchema";
import { LoadingStatusEnum, SocialType } from "../../types";
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const registrationFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      desc: "",
      hometown: "",
      city: "",
      profilePicture: "",
      coverPicture: "",
      relationship: 2,
    },
    validationSchema: registrationValidationSchema,
    onSubmit: (values) => {
      //@ts-ignore
      dispatch(registration(values));
      localStorage.setItem("currentUser", JSON.stringify(values));
    },
  });
  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus
  );

  return (
    <form
      onSubmit={registrationFormik.handleSubmit}
      className="w-[450px] min-w-[350px] min-h-[570px] z-20 flex flex-col items-center justify-between shadow-xl gap-3 p-6 rounded-xl bg-white"
    >
      <h2 className="font-bold text-lg ">Create Account</h2>

      <WhiteBorderTextField
        fullWidth
        placeholder="Email"
        value={registrationFormik.values.email}
        id="email"
        name="email"
        sx={{
          backgroundColor: "white",
        }}
        //@ts-ignore
        error={registrationFormik.errors.email}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.email && registrationFormik.errors.email
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="Password"
        type="password"
        value={registrationFormik.values.password}
        id="password"
        name="password"
        sx={{
          backgroundColor: "white",
        }}
        //@ts-ignore
        error={registrationFormik.errors.password}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.password &&
          registrationFormik.errors.password
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="Username"
        value={registrationFormik.values.username}
        id="username"
        name="username"
        sx={{
          backgroundColor: "white",
        }}
        //@ts-ignore
        error={registrationFormik.errors.username}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.username &&
          registrationFormik.errors.username
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="Some words about you"
        value={registrationFormik.values.desc}
        id="desc"
        name="desc"
        sx={{
          backgroundColor: "white",
        }}
        //@ts-ignore
        error={registrationFormik.errors.desc}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.desc && registrationFormik.errors.desc
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="Hometown"
        value={registrationFormik.values.hometown}
        id="hometown"
        name="hometown"
        sx={{
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
        //@ts-ignore
        error={registrationFormik.errors.hometown}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.hometown &&
          registrationFormik.errors.hometown
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="City of living"
        value={registrationFormik.values.city}
        id="city"
        name="city"
        sx={{
          backgroundColor: "white",
        }}
        //@ts-ignore
        error={registrationFormik.errors.city}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.city && registrationFormik.errors.city
        }
      />
      {loadingStatus.currentUser === LoadingStatusEnum.REJECTED && (
        <p className="text-red-400 text-[12px]">This user is already exist</p>
      )}
      {loadingStatus.currentUser === LoadingStatusEnum.PENDING && (
        <img
          className="h-[50px] w-[50px]"
          src={process.env.PUBLIC_URL + "/assets/spinner.svg"}
          alt="loader"
        />
      )}
      <Button
        type="submit"
        sx={{ height: "45px", background: "rgb(66,183,41)", width: "100%" }}
        variant="contained"
        fullWidth
        color="success"
      >
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
