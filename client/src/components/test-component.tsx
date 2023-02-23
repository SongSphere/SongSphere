import React from "react";

// import services
import {
  requestSpotifyAuthorization,
  getToken,
} from "../services/spotify-link";

const TwoButtons = () => {
  return (
    <div>
      <button
        onClick={() => requestSpotifyAuthorization()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"request spotify auth"}
      </button>
      <button
        onClick={() => getToken()}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        {"get token"}
      </button>
    </div>
  );
};

export default TwoButtons;
