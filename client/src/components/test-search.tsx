import React from "react";

// import services
import { searchUser } from "../services/search-user";

export const GetPostButton = () => {
  return (
    <div>
      <button
        onClick={() => searchUser("e")}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"search user"}
      </button>
    </div>
  );
};
