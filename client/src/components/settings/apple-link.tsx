import fetchUser from "../../services/user/fetch-user";
import { appleAuth } from "../../services/user/apple-music-link";
import Session from "../../session";
import { useEffect, useState } from "react";

const AppleLink = () => {
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    setAMInstance(Session.getAMInstance());
  }, []);

  if (!AMInstance) {
    return <div>fetching Apple Music Instance</div>;
  }

  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          try {
            await appleAuth(AMInstance);
          } catch (error) {
            console.error(error);
          }

          try {
            await Session.setUser(await fetchUser());
            // TODO: can be better handled in the future
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Authorize Apple Music
      </button>
    </div>
  );
};

export default AppleLink;
