/*
  
  Author: David Kim
  this is a page for settings page
  Contains modal, Calls Adjust Names Link to update toward DB
*/

import { useContext, useEffect, useState } from "react";
import AdjustNamesLink from "../components/adjust-names-link";
import DeleteGoogleAcountLink from "../components/delete-google-account-link";
import { TUser } from "../types/user";
import {
  BackgroundImgCropper,
  ProfileImgCropper,
} from "../components/image-handler";
import Navbar from "../components/navbar";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import unlinkMusic from "../services/unlink-music";
import fetchUser from "../services/fetch-user";
import {
  UpdateBackgroundURL,
  UpdateProfileURL,
} from "../components/image-url-handler";
import { spotifyRefresh } from "../services/spotify-link";

interface ISettingPageProps {
  user: TUser | null;
  appleMusicInstance: MusicKit.MusicKitInstance;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPage = (props: ISettingPageProps) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [userName, setUserName] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState<string>("");

  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.user) {
      setUserName(props.user.userName);
      setGivenName(props.user.givenName);
      setMiddleName(props.user.middleName);
      setFamilyName(props.user.familyName);
      if (props.user.appleToken != undefined) {
        setAppleAccountStatus(true);
      } else {
        setAppleAccountStatus(false);
      }
      if (props.user.spotifyToken != undefined) {
        setSpotifyAccountStatus(true);
      } else {
        setSpotifyAccountStatus(false);
      }
    }
  }, [props.user]);

  if (!props.user) {
    return <div>fetching user data</div>;
  } else {
    return (
      <div>
        <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
        <div className="flex flex-wrap items-center mt-20">
          <div className="w-full text-center sm:w-1/2 sm:px-6">
            <h3 className="text-3xl font-semibold text-gray-900">
              Settings for: {props.user?.givenName}
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              setUser={props.setUser}
              username={userName}
              givenName={givenName}
              middleName={middleName}
              familyName={familyName}
            />

            <DeleteGoogleAcountLink
              user={props.user}
              setUser={props.setUser}
              setIsLoggedIn={props.setIsLoggedIn}
            />
            <AppleLink
              setUser={props.setUser}
              appleMusicInstance={props.appleMusicInstance}
            />
            <div>{`Apple API connected: ${appleAccountStatus}`}</div>
            <button
              className="p-2 rounded-md bg-amber-300"
              onClick={async () => {
                await unlinkMusic("apple").then(async () => {
                  props.setUser(await fetchUser());
                });
              }}
            >
              Unlink Apple Music
            </button>
            <SpotifyLinkButton setUser={props.setUser} />
            <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>
            <button
              className="p-2 rounded-md bg-amber-300"
              onClick={async () => {
                await unlinkMusic("spotify").then(async () => {
                  props.setUser(await fetchUser());
                });
              }}
            >
              Unlink Spotify
            </button>

            <ProfileImgCropper
              onCropComplete={console.log}
              setUser={props.setUser}
              user={props.user}
            />
            {/* 
            <input
              className="e-input"
              type="text"
              placeholder="Enter Profile Photo URL"
              value={profileImgUrl}
              onChange={(e) => setProfileImgUrl(e.target.value)}
            />

            <UpdateProfileURL url={profileImgUrl} /> */}

            <BackgroundImgCropper
              onCropComplete={console.log}
              setUser={props.setUser}
              user={props.user}
            />
            {/* 
            <input
              className="e-input"
              type="text"
              placeholder="Enter Background Photo URL"
              value={backgroundImgUrl}
              onChange={(e) => setBackgroundImgUrl(e.target.value)}
            />
            <UpdateBackgroundURL url={backgroundImgUrl} /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default SettingsPage;
