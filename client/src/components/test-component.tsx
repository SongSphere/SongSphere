import React from "react";
import { useEffect, useState } from "react";

// import services
import {
  requestSpotifyAuthorization,
  getToken,
} from "../services/spotify-link";

const TwoButtons = () => {
  const [url, setUrl] = useState(window.location.href);
  const codePrefixString = "?code=";

  useEffect(() => {
    const spotifyAuth = async () => {
      if (url.includes(codePrefixString)) {
        const uriString = window.location.search; // url from window
        const urlParameters = new URLSearchParams(uriString);
        const code = urlParameters.get("code");
        if (code) {
          const token = await getToken(code);
          console.log(token);
        }
      }
    };
    spotifyAuth();
  }, [url]);

  return (
    <div>
      <button
        onClick={() => requestSpotifyAuthorization()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"request spotify auth"}
      </button>
      <p>{url}</p>
    </div>
  );
};

export default TwoButtons;
