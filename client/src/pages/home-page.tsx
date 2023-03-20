import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import SpotfiyLinkButton from "../components/spotify-link";
import Session from "../session";
import { useEffect, useState } from "react";

interface IHomePageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  // user: TUser | null;
  // setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage = (props: IHomePageProps) => {
  const [user, setUser] = useState<TUser | null>();
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar />
    </div>
  );
};

export default HomePage;
