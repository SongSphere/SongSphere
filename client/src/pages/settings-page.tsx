import { useEffect, useState } from "react";
import { TUser } from "../types/user";
import Session from "../session";
import BlockedList from "../components/settings/blocked-list";
import ProfileSettingCard from "../components/settings/profile-setting-card";

import EvenLayout from "../layouts/even-layout";
import ImageSettingCard from "../components/settings/image-setting-card";
import MusicSettingCard from "../components/settings/music-setting-card";
import DangerZone from "../components/settings/danger-zone";

const SettingsPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    setUser(Session.getUser());
  }, []);

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
        right={
          <div>
            <MusicSettingCard user={user} />
            <DangerZone />
          </div>
        }
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
