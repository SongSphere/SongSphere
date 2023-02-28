import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import NewNavbar from "../components/new-navbar";
import handleSignout from "../services/handle-sign-out";
import { TUser } from "../types/user";
import SpotfiyLinkButton from "../components/spotify-link";

interface IHomePageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage = (props: IHomePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <NewNavbar />
      <div className="grid grid-cols-4 gap-8">
        <div>maybe friend activities</div>
        <div className="col-span-2">
          <div>temporary setting stuff:</div>
          <AppleLink
            setUser={props.setUser}
            appleMusicInstance={props.appleMusicInstance}
          />
          <SpotfiyLinkButton setUser={props.setUser} />
          <div>
            <button
              className="p-2 rounded-md bg-amber-400"
              onClick={async () => {
                // If sign out success then set loggedin to false
                // Redirect to the authentication page
                const logoutSuccesss = await handleSignout();
                if (logoutSuccesss) {
                  props.setUser(null);
                  props.setIsLoggedIn(false);
                }
              }}
            >
              logout
            </button>
            <button
              onClick={async () => {
                navigate("/settings");
              }}
            >
              Settings
            </button>
          </div>
        </div>
        {/* <AppleMusicPlayerCard musicInstance={props.appleMusicInstance} /> */}
        <SpotifyPlayerCard user={props.user} />
      </div>
    </div>
  );
};

export default HomePage;
