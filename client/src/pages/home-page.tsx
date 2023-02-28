import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import Navbar from "../components/navbar";
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
      <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
      <div className="grid grid-cols-4 gap-8">
        <div>maybe friend activities</div>
        <div className="col-span-2">
          <div>temporary setting stuff:</div>
          <AppleLink
            setUser={props.setUser}
            appleMusicInstance={props.appleMusicInstance}
          />
          <SpotfiyLinkButton setUser={props.setUser} />
        </div>
        {/* <AppleMusicPlayerCard musicInstance={props.appleMusicInstance} /> */}
        <SpotifyPlayerCard user={props.user} />
      </div>
    </div>
  );
};

export default HomePage;
