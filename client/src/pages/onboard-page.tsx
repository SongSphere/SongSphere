/*
  Author: David Kim
  this is a onboard page for apple and spotify, when success goes to home
  Note: When connecting with Spotify, redirect back to Onboard is unstable(janky) just for documentation
*/

import { useEffect, useState } from "react";
import AppleLink from "../components/settings/apple-link";
import SpotifyLinkButton from "../components/settings/spotify-link";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/user";
import AdjustNamesLink from "../components/settings/adjust-names-link";
import setOnboarded from "../services/user/set-onboarded";
import Session from "../session";
import { setDefaultPlatform } from "../services/user/default-platform";

interface IOnBoardPageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const OnBoardPage = (props: IOnBoardPageProps) => {
  let navigate = useNavigate();

  const [username, setUsername] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [givenName, setGivenName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [spotifyLinked, setSpotifyLinked] = useState(false);
  const [appleLinked, setAppleLinked] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  // hook to load user session from object
  useEffect(() => {
    setUser(Session.getUser());
  }, []);

  useEffect(() => {
    if (user) {
      setGivenName(user.givenName);
      setFamilyName(user.familyName);
      setEmail(user.email);
      setUsername(user.username);
      setMiddleName(user.middleName);

      if (user.onboarded) {
        navigate("/");
      }

      if (user.appleToken !== undefined) {
        user.defaultPlatform = "apple";
        Session.setUser(user);
        console.log("apple");
        Session.setMusicService("apple");
        setDefaultPlatform("apple");
        setAppleLinked(true);
      } else {
        setAppleLinked(false);
      }

      if (user.spotifyToken !== undefined) {
        user.defaultPlatform = "spotify";
        Session.setMusicService("spotify");
        Session.setUser(user);
        console.log("spotify");
        setDefaultPlatform("spotify");
        setSpotifyLinked(true);
      } else {
        setSpotifyLinked(false);
      }
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">
          Welcome {givenName}
        </h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music or Spotify account
        </div>
      </div>

      <div className="w-full p-6 sm:w-1/2">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <AppleLink appleMusicInstance={props.appleMusicInstance} />
        <div>{`apple linked: ${appleLinked}`}</div>

        <SpotifyLinkButton />

        <div>{`spotify linked: ${spotifyLinked}`}</div>

        <input
          className="e-input"
          type="text"
          placeholder="Enter User Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className="e-input"
          type="text"
          placeholder="Enter Middle Name"
          onChange={(e) => setMiddleName(e.target.value)}
          value={middleName}
        />
        <AdjustNamesLink
          appleMusicInstance={props.appleMusicInstance}
          username={username ? username : ""}
          givenName={givenName ? givenName : ""}
          middleName={middleName ? middleName : ""}
          familyName={familyName ? familyName : ""}
        />
        <button
          onClick={() => {
            if ((spotifyLinked || appleLinked) && username !== "") {
              if (user) {
                setOnboarded(email).then(() => {
                  navigate("/");
                  window.location.reload();
                });
              }
            } else {
              window.alert(
                "need to link with at least one music platform and have a username"
              );
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnBoardPage;
