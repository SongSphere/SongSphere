import { useEffect, useState } from "react";
import { requestSpotifyAuthorization } from "../services/spotify-link";
import { spotifyAuth } from "../services/spotify-link";
import Session from "../session";

import fetchUser from "../services/user/fetch-user";

interface ISpotfiyLinkButtonProps {}

const SpotifyLinkButton = (props: ISpotfiyLinkButtonProps) => {
  const [calledSpotifyAuth, setCalledSpotifyAuth] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const codePrefixString = "?code=";

    const spotifyAuthHandler = async () => {
      if (url.includes(codePrefixString)) {
        const uriString = window.location.search;
        const urlParameters = new URLSearchParams(uriString);
        const code = urlParameters.get("code");

        // this ensures that spotifyAuth only get called once
        if (code && !calledSpotifyAuth) {
          setCalledSpotifyAuth(true);
          try {
            spotifyAuth(code).then(async () => {
              Session.setUser(await fetchUser());
              // TODO: Can be better handled in the future
              window.location.reload();
            });
          } catch (error) {
            console.error(error);
          }
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

export default SpotifyLinkButton;
