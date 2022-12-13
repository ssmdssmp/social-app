import CreatePostForm from "../Forms/CreatePostForm";
import { useSelector } from "react-redux";
import { SocialType } from "../../types";

function CreatePost() {
  const currentUser = useSelector(
    ({ social }: SocialType) => social.currentUser.data
  );

  return (
    <div className=" border-t gap-3 py-5 px-5 relative justify-between rounded-md  w-5/6 bg-white shadow-md flex flex-col max-w-xl">
      <div className="flex items-center gap-2">
        <img
          className="ml-1 h-10 w-10 top-0 object-cover rounded-full"
          src={currentUser.profilePicture}
          alt=""
        />
        <p>{currentUser.username}</p>
      </div>
      <CreatePostForm />
    </div>
  );
}

export default CreatePost;
