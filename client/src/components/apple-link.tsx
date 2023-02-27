import { userSessionContext } from "../context/userSessionContext";
import fetchUser from "../services/fetch-user";
import { appleAuth } from "../services/apple-music-link";
import { useContext } from "react";

interface IAppleLinkProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const AppleLink = (props: IAppleLinkProps) => {
  const { setUser } = useContext(userSessionContext);

  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          try {
            await appleAuth(props.musicInstance);
          } catch (error) {
            console.error(error);
          }

          try {
            await setUser(await fetchUser());
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
