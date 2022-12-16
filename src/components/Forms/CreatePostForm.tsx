import { useFormik } from "formik";
import AddOptions from "../CreatePost/AddOptions";
import { Button } from "@mui/material";
import { WhiteBorderTextField } from "../ui/WhiteBorderTextField";
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from "./validationSchema";
import { useSelector } from "react-redux";
import { LoadingStatusEnum, SocialType } from "../../types";
import { createPost, deletePost, updatePost } from "../../hooks/postHooks";
import { clearPostDraft, deleteImage } from "../../reducers/socialSlice";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

const CreatePostForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );

  const loadingStatus = useSelector(
    ({ social }: SocialType) => social.loadingStatus.feed
  );
  const postDraft = useSelector(({ social }: SocialType) => social.postDraft);

  const formik = useFormik({
    initialValues: {
      userId: currentUser._id,
      desc: postDraft ? postDraft.desc : "",
      postPic: postDraft ? postDraft.postPic : "",
      createdAt: postDraft ? postDraft.createdAt : "",
      // userId: "",
      // desc: "",
      // postPic: "",
      // createdAt: "",
      updatedAt: "",
    },
    enableReinitialize: true,
    validationSchema:
      postDraft._id !== ""
        ? updatePostValidationSchema
        : createPostValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (postDraft._id !== "") {
        values.updatedAt = new Date().toString();
        //@ts-ignore
        dispatch(updatePost({ id: postDraft._id, data: values }));
      } else {
        values.createdAt = new Date().toString();
        //@ts-ignore
        dispatch(createPost(values));
      }

      resetForm();
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (postDraft._id !== "") {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [postDraft._id]);

  return (
    <form className=" min-w-[350px]" onSubmit={formik.handleSubmit}>
      <WhiteBorderTextField
        autoFocus={true}
        fullWidth
        sx={{ verticalAlign: "start", height: "120px" }}
        size="medium"
        id="desc"
        name="desc"
        placeholder="Express yourself"
        multiline
        minRows={3}
        maxRows={3}
        disabled={loadingStatus === LoadingStatusEnum.PENDING}
        value={formik.values.desc}
        onChange={(e) => {
          formik.handleChange(e);
          if (e.target.value === "" && formik.values.postPic === "") {
            console.log(1);
            dispatch(clearPostDraft());
            setIsEditMode(false);
          }
        }}
        error={formik.touched.desc && Boolean(formik.errors.desc)}
        helperText={formik.touched.desc && formik.errors.desc}
        onKeyDown={(e) => e.key === "Enter" && formik.handleSubmit()}
      />
      {postDraft.postPic && (
        <div className="w-full flex justify-center">
          <div className="w-fit flex relative ">
            <img
              className="max-h-[500px] rounded-md object-center "
              src={formik.values.postPic}
              alt=""
            />
            <div className="absolute top-3 right-3 rounded-sm border w-fit h-fit border-dotted border-white cursor-pointer">
              <ClearIcon
                onClick={() => dispatch(deleteImage())}
                sx={{ filter: "invert(1)" }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between h-[60px]">
        <AddOptions />
        {isEditMode ? (
          <Button
            sx={{ width: "120px", height: "45px" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Update
          </Button>
        ) : (
          <Button
            sx={{ width: "120px", height: "45px", filter: "brightness(120%)" }}
            color="success"
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};
export default CreatePostForm;
