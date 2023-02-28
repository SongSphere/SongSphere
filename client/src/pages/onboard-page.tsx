/*
  Author: David Kim
  this is a onboard page for apple and spotify, when success goes to home
  Note: When connecting with Spotify, redirect back to Onboard is unstable(janky) just for documentation
*/

import { useContext, useEffect } from "react";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import { TUser, userSessionContext } from "../context/userSessionContext";
import { useNavigate } from "react-router-dom";

interface IOnBoardPageProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const OnBoardPage = (props: IOnBoardPageProps) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);
  let navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">
          Welcome {user?.givenName}
        </h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music or Spotify account
        </div>
      </div>

      <div className="w-full p-6 sm:w-1/2">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <AppleLink musicInstance={props.musicInstance} />
        <SpotifyLinkButton />
        <button
          onClick={() => {
            console.log("clicked");
            navigate("/");
            window.location.reload();
          }}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
};

export default OnBoardPage;
