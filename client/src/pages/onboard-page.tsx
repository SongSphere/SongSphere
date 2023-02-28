/*
  Author: David Kim
  this is a onboard page for apple and spotify, when success goes to home
  Note: When connecting with Spotify, redirect back to Onboard is unstable(janky) just for documentation
*/

import { useState } from "react";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/user";
import AdjustNamesLink from "../components/adjust-names-link";

interface IOnBoardPageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const OnBoardPage = (props: IOnBoardPageProps) => {
  let navigate = useNavigate();

  const [userName, setUserName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">
          Welcome {props.user?.givenName}
        </h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music or Spotify account
        </div>
      </div>

      <div className="w-full p-6 sm:w-1/2">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <AppleLink
          setUser={props.setUser}
          appleMusicInstance={props.appleMusicInstance}
        />
        <SpotifyLinkButton setUser={props.setUser} />

        <input
          className="e-input"
          type="text"
          placeholder="Enter User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="e-input"
          type="text"
          placeholder="Enter Middle Name"
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <AdjustNamesLink
          appleMusicInstance={props.appleMusicInstance}
          setUser={props.setUser}
          username={userName ? userName : ""}
          givenName={props.user?.givenName ? props.user?.givenName : ""}
          middleName={middleName ? middleName : ""}
          familyName={props.user?.familyName ? props.user?.familyName : ""}
        />

        <button
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnBoardPage;
