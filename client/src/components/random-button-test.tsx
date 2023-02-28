import React from "react";

// import services
import { createPost, editPost, removePost } from "../services/post-test";

export const PostButtons = () => {
  return (
    <div>
      <button
        onClick={() => createPost()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"create"}
      </button>
      <button
        onClick={() => editPost()}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        {"edit"}
      </button>
      <button
        onClick={() => removePost()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"remove"}
      </button>
    </div>
  );
};
