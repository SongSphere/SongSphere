import { useEffect, useState } from "react";

// import services
import { requestSpotifyAuthorization } from "../services/spotify-link";
import { spotifyAuth } from "../services/spotify-link";

const TwoButtons = () => {
  const [calledSpotifyAuth, setCalledSpotifyAuth] = useState(false);
  useEffect(() => {
    const url = window.location.href;
    const codePrefixString = "?code=";

    const spotifyAuthHandler = async () => {
      if (url.includes(codePrefixString)) {
        const uriString = window.location.search; // url from window
        const urlParameters = new URLSearchParams(uriString);
        const code = urlParameters.get("code");
        if (code && !calledSpotifyAuth) {
          setCalledSpotifyAuth(true);
          console.log(code);
          await spotifyAuth(code);
        }
      }
    };
    spotifyAuthHandler();
  }, []);

  return (
    <div>
      <button
        onClick={() => requestSpotifyAuthorization()}
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {"request spotify auth"}
      </button>
    </div>
  );
};

export default TwoButtons;
