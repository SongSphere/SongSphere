import React from "react";

// import services
import { getPosts } from "../services/test-get";

export const GetPostButton = () => {
  return (
    <div>
      <button
        onClick={() => getPosts()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"get posts"}
      </button>
    </div>
  );
};
