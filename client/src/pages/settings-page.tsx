import { useEffect, useState } from "react";
import { TUser } from "../types/user";
import {
  BackgroundImgCropper,
  ProfileImgCropper,
} from "../components/settings/image-handler";
import AppleLink from "../components/settings/apple-link";
import SpotifyLinkButton from "../components/settings/spotify-link";
import unlinkMusic from "../services/user/unlink-music";
import DefaultPlatform from "../components/settings/set-default-platform";
import fetchUser from "../services/user/fetch-user";
import Session from "../session";
import BlockedList from "../components/settings/blocked-list";
import ProfileSettingCard from "../components/settings/profile-setting-card";

import EvenLayout from "../layouts/even-layout";
import ImageSettingCard from "../components/settings/image-setting-card";

const SettingsPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState<string>("");

  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);
  const [defaultPlatform, setDefaultPlatform] = useState<string>("");
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
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
      setBackgroundImgUrl(user.backgroundImgUrl);
      setProfileImgUrl(user.profileImgUrl);
      setDefaultPlatform(user.defaultPlatform);
    }
  }, [user]);

  if (!user) {
    return <div>fetching user data</div>;
  }

  const middle = <ImageSettingCard />;

  const right = (
    <div className="justify-center w-full p-10 mt-5 ml-5 bg-white rounded-md h-5/6 sm:w-3/4 sm:px-6 drop-shadow-md">
      <h3 className="mb-5 text-3xl font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
        Music Settings
      </h3>
      <AppleLink />
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
      <div>{`Apple API connected: ${appleAccountStatus}`}</div>
      <SpotifyLinkButton />

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
      <div>{`Spotify API connected: ${spotifyAccountStatus}`}</div>

      <DefaultPlatform />
    </div>
  );

  return (
    <div>
      <EvenLayout
        left={<ProfileSettingCard setShowBlockModal={setShowBlockModal} />}
        middle={middle}
        right={right}
      />
      <BlockedList
        blockedList={user.blockedUsers}
        isVisible={showBlockModal}
        onClose={() => {
          setShowBlockModal(false);
        }}
      />
    </div>
  );
};

export default SettingsPage;
