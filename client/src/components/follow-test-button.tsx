import React from "react";

// import services
import { followSomeone, unfollowSomeone } from "../services/follow-test";

export const FollowButtons = () => {
  return (
    <div>
      <button
        onClick={() => followSomeone()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"follow"}
      </button>
      <button
        onClick={() => unfollowSomeone()}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        {"unfollow"}
      </button>
    </div>
  );
};
