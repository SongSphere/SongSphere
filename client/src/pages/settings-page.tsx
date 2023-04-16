import { useEffect, useState } from "react";
import { TUser } from "../types/user";
import Session from "../session";
import BlockedList from "../components/settings/blocked-list";
import ProfileSettingCard from "../components/settings/profile-setting-card";

import EvenLayout from "../layouts/even-layout";
import ImageSettingCard from "../components/settings/image-setting-card";
import MusicSettingCard from "../components/settings/music-setting-card";

const SettingsPage = () => {
  const [user, setUser] = useState<TUser | null>(null);

  // const [defaultPlatform, setDefaultPlatform] = useState<string>("");
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    setUser(Session.getUser());
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     if (user.appleToken != undefined) {
  //       setAppleAccountStatus(true);
  //     } else {
  //       setAppleAccountStatus(false);
  //     }
  //     if (user.spotifyToken != undefined) {
  //       setSpotifyAccountStatus(true);
  //     } else {
  //       setSpotifyAccountStatus(false);
  //     }
  //     setBackgroundImgUrl(user.backgroundImgUrl);
  //     setProfileImgUrl(user.profileImgUrl);
  //     setDefaultPlatform(user.defaultPlatform);
  //   }
  // }, [user]);

  if (!user) {
    return <div>fetching user data</div>;
  }

  return (
    <div>
      <EvenLayout
        left={
          <ProfileSettingCard
            setShowBlockModal={setShowBlockModal}
            user={user}
          />
        }
        middle={<ImageSettingCard />}
        right={<MusicSettingCard user={user} />}
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
