import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
const Ad = () => {
  return (
    <a href="https://github.com/ssmdssmp" target="_blank">
      <div className="w-[300px] h-[200px] bg-transparent border flex-col border-slate-400 border-dotted rounded-md opacity-40 flex justify-center items-center gap-3 hover:opacity-70 transition-opacity duration-300">
        <div className="flex justify-center items-center gap-2">
          <GitHubIcon sx={{ height: "50px", width: "50px" }} />
          <p> My GitHub</p>
        </div>
        <p className="text-sm">https://github.com/ssmdssmp</p>
      </div>
    </a>
  );
};

export default Ad;
