import * as yup from "yup";
export const loginvalidationSchema = yup.object({
  email: yup
    .string()
    .email()
    .max(50, "50 characters max")
    .required("This field is requiered"),
  password: yup
    .string()
    .min(8, "8 characters minimum")
    .required("This field is requiered"),
});
export const registrationValidationSchema = yup.object({
  email: yup.string().email().required("This is required field"),
  password: yup
    .string()
    .min(8, "8 characters minimum")
    .required("This is required field"),
  username: yup
    .string()
    .min(5, "5 characters minimum")
    .required("This is required field"),
  desc: yup.string().max(200, "200 characters max"),
  hometown: yup.string().max(100, "100 characters max"),
  city: yup.string().max(100, "100 characters max"),
});
export const createPostValidationSchema = yup.object({
  userId: yup.string().required(),
  desc: yup
    .string()
    .required("Post need include at least one character")
    .min(1),
  postPic: yup.string(),
});
export const updatePostValidationSchema = yup.object({
  userId: yup.string().required(),
  desc: yup.string(),
  postPic: yup.string(),
});
