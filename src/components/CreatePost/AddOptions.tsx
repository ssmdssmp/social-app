import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const AddOptions = () => {
  const AddToPostOption = ({
    option,
    children,
  }: {
    option: string;
    children: any;
  }) => {
    return (
      <li className=" cursor-pointer font-medium flex items-center gap-1">
        {children}
        <p className=" hidden md:block">{option}</p>
      </li>
    );
  };
  return (
    <ul className="flex gap-5">
      <AddToPostOption option="Photo or video">
        <AddPhotoAlternateOutlined sx={{ color: "rebeccapurple" }} />
      </AddToPostOption>
      <AddToPostOption option="Tag">
        <LocalOfferIcon sx={{ color: "green", filter: "brightness(140%)" }} />
      </AddToPostOption>
      <AddToPostOption option="Location">
        <PersonPinCircleIcon sx={{ color: "red" }} />
      </AddToPostOption>
      <AddToPostOption option="">
        <InsertEmoticonIcon
          sx={{ color: "yellow", filter: "brightness(85%)" }}
        />
      </AddToPostOption>
    </ul>
  );
};

export default AddOptions;
