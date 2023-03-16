import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import SpotfiyLinkButton from "../components/spotify-link";
import FetchFeed from "../components/dummy-feed-fetch";

interface IHomePageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage = (props: IHomePageProps) => {
  const navigate = useNavigate();

  if (!props.user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
      <div className="grid grid-cols-4 gap-8">
        <div>here will show friend activities.</div>
        <div className="col-span-2">
          <div>
            this will be the feed. Implementing the feed is not part of sprint
            1.
          </div>
          <FetchFeed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
