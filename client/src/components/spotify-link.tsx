import { useContext, useEffect, useState } from "react";
import { requestSpotifyAuthorization } from "../services/spotify-link";
import { spotifyAuth } from "../services/spotify-link";
import { userSessionContext } from "../context/userSessionContext";
import { useNavigate } from "react-router-dom";

import fetchUser from "../services/fetch-user";

const SpotifyLinkButton = () => {

  const [calledSpotifyAuth, setCalledSpotifyAuth] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  let navigate = useNavigate();


  const handleNavigationToApple = () => {
    navigate("auth/apple");
  };



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
            await spotifyAuth(code);
           // handleNavigationToApple();

            // update session
            setUser(await fetchUser());


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
