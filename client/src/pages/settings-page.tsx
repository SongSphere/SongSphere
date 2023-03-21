/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useContext, useEffect, useState } from "react";
import AdjustNamesLink from "../components/settings/adjust-names-link";
import DeleteGoogleAcountLink from "../components/settings/delete-google-account-link";
import { TUser } from "../types/user";
import {
  BackgroundImgCropper,
  ProfileImgCropper,
} from "../components/settings/image-handler";
import Navbar from "../components/navbar";
import AppleLink from "../components/settings/apple-link";
import SpotifyLinkButton from "../components/settings/spotify-link";
import unlinkMusic from "../services/unlink-music";
import fetchUser from "../services/user/fetch-user";
import Session from "../session";

interface ISettingPageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const SettingsPage = (props: ISettingPageProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [username, setUsername] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState<string>("");

  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setGivenName(user.givenName);
      setMiddleName(user.middleName);
      setFamilyName(user.familyName);
      if (user.appleToken != undefined) {
        setAppleAccountStatus(true);
      } else {
        setAppleAccountStatus(false);
      }
      if (user.spotifyToken != undefined) {
        setSpotifyAccountStatus(true);
      } else {
        setSpotifyAccountStatus(false);
      }
    }
  }, [user]);

  if (!user) {
    return <div>fetching user data</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap items-center mt-20">
        <div className="w-full text-center sm:w-1/2 sm:px-6">
          <h3 className="text-3xl font-semibold text-gray-900">
            Settings for: {user.givenName}
          </h3>
          <div className="mt-6 text-xl leading-9">
            Let's change your profile
          </div>
        </div>

        <div className="w-full p-6 sm:w-1/2">
          <input
            className="e-input"
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="e-input"
            type="text"
            placeholder="Enter Given Name"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
          />
          <input
            className="e-input"
            type="text"
            placeholder="Enter Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            className="e-input"
            type="text"
            placeholder="Enter Last Name"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />

          <AdjustNamesLink
            appleMusicInstance={props.appleMusicInstance}
            username={username}
            givenName={givenName}
            middleName={middleName}
            familyName={familyName}
          />

          <DeleteGoogleAcountLink />
          <AppleLink appleMusicInstance={props.appleMusicInstance} />
          <div>{`Apple API connected: ${appleAccountStatus}`}</div>
          <button
            className="p-2 rounded-md bg-amber-300"
            onClick={async () => {
              await unlinkMusic("apple").then(async () => {
                Session.setUser(await fetchUser());
                setUser(Session.getUser());
              });
            }}
          >
            Unlink Apple Music
          </button>
          <SpotifyLinkButton />
          <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>
          <button
            className="p-2 rounded-md bg-amber-300"
            onClick={async () => {
              await unlinkMusic("spotify").then(async () => {
                Session.setUser(await fetchUser());
                setUser(Session.getUser());
              });
            }}
          >
            Unlink Spotify
          </button>

          <ProfileImgCropper onCropComplete={console.log} />
          <BackgroundImgCropper onCropComplete={console.log} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
