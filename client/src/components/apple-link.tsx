import fetchUser from "../services/fetch-user";
import { appleAuth } from "../services/apple-music-link";
import { TUser } from "../types/user";

interface IAppleLinkProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
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
            await props.setUser(await fetchUser());
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
