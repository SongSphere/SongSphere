import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import NewNavbar from "../components/new-navbar";
import SpotfiyLinkButton from "../components/spotify-link";
import { userSessionContext } from "../context/userSessionContext";
import handleSignout from "../services/handle-sign-out";

interface IHomePageProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const HomePage = (props: IHomePageProps) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <NewNavbar />
      <div className="grid grid-cols-4 gap-8">
        <div>maybe friend activities</div>
        <div className="col-span-2">
          <div>temporary setting stuff:</div>
          <AppleLink musicInstance={props.musicInstance} />
          <SpotfiyLinkButton />
          <div>
            <button
              className="p-2 rounded-md bg-amber-400"
              onClick={async () => {
                // If sign out success then set loggedin to false
                // Redirect to the authentication page
                const logoutSuccesss = await handleSignout();
                if (logoutSuccesss) {
                  setUser(null);
                  setIsLoggedIn(false);
                  window.location.reload();
                }
              }}
            >
              logout
            </button>
          </div>
        </div>
        <AppleMusicPlayerCard musicInstance={props.musicInstance} />
      </div>
    </div>
  );
};

export default HomePage;
