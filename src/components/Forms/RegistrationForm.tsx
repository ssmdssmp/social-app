import { Button } from "@mui/material";
import { useFormik } from "formik";
import { WhiteBorderTextField } from "../ui/WhiteBorderTextField";
import { registration } from "../../hooks/userHooks";
import { useDispatch } from "react-redux";
import { registrationValidationSchema } from "./validationSchema";
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
      // console.log(values);
      //@ts-ignore
      dispatch(registration(values));
    },
  });

  return (
    <form
      onSubmit={registrationFormik.handleSubmit}
      className="w-[450px] min-w-[350px] min-h-[550px] z-20 flex flex-col items-center shadow-xl gap-3 p-6 rounded-xl bg-white"
    >
      <h2 className="font-bold text-lg ">Create Account</h2>

      <WhiteBorderTextField
        fullWidth
        placeholder="email"
        value={registrationFormik.values.email}
        id="email"
        name="email"
        //@ts-ignore
        error={registrationFormik.errors.email}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.email && registrationFormik.errors.email
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="password"
        type="password"
        value={registrationFormik.values.password}
        id="password"
        name="password"
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
        placeholder="username"
        value={registrationFormik.values.username}
        id="username"
        name="username"
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
        placeholder="some words about you"
        value={registrationFormik.values.desc}
        id="desc"
        name="desc"
        //@ts-ignore
        error={registrationFormik.errors.desc}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.desc && registrationFormik.errors.desc
        }
      />
      <WhiteBorderTextField
        fullWidth
        placeholder="hometown"
        value={registrationFormik.values.hometown}
        id="hometown"
        name="hometown"
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
        placeholder="city of living"
        value={registrationFormik.values.city}
        id="city"
        name="city"
        //@ts-ignore
        error={registrationFormik.errors.city}
        onChange={registrationFormik.handleChange}
        helperText={
          registrationFormik.touched.city && registrationFormik.errors.city
        }
      />
      <Button
        type="submit"
        sx={{ height: "45px", background: "rgb(66,183,41)", width: "100%" }}
        variant="contained"
        fullWidth
        color="success"
      >
        {" "}
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
