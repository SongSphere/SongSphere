import fetchUser from "../../services/user/fetch-user";
import { appleAuth } from "../../services/apple-music-link";
import Session from "../../session";

interface IAppleLinkProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const AppleLink = (props: IAppleLinkProps) => {
  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          try {
            await appleAuth(props.appleMusicInstance);
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
