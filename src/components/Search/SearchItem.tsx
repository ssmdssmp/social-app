import React from "react";
import { UserType } from "../../types";
import { Link } from "react-router-dom";

const SearchItem = ({
  settings,
  searchInput,
}: {
  settings: UserType;
  searchInput: string;
}) => {
  return (
    <Link onClick={() => searchInput === ""} to={`/person/${settings._id}`}>
      <li className="h-14 cursor-pointer w-full rounded-sm bg-cyan-50  border flex items-center p-2">
        {settings.username}
      </li>
    </Link>
  );
};

export default SearchItem;
