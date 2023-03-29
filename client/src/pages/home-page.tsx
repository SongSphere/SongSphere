import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Feed from "../components/feed/feed";
import AppleMusicPlayerCard from "../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../components/player/spotify-music-player-card";
import { TMusicContent } from "../types/music-content";
import {
  randomSongSpotify,
  randomSongSpotifyFromBackend,
} from "../services/spotify/spotify-search";
import RandomSongPost from "../components/feed/random-song-content";
import { TPost } from "../types/post";
import Comment from "../components/dummy-comment";

interface IHomePageProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const HomePage = (props: IHomePageProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [randomSongToggle, setRandomSongToggle] = useState<boolean>(false);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [randomSong, setRandomSong] = useState<TMusicContent | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());

    if (user) {
      randomSongSpotifyFromBackend(user.spotifyToken).then(async (url) => {
        setRandomSong(await randomSongSpotify(user.spotifyToken, url));
      });
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <div>this will be where the user activity be</div>
        </div>
        <div className="col-span-2">
          {user.showRandomSong ? (
            <RandomSongPost song={randomSong} user={user} />
          ) : (
            <div></div>
          )}

          <Feed setSong={setSong} user={user} />
        </div>
        {service === "apple" ? (
          <AppleMusicPlayerCard
            musicInstance={props.appleMusicInstance}
            selectedSong={song}
          />
        ) : (
          <SpotifyPlayerCard
            selectedSong={song}
            appleMusicInstance={props.appleMusicInstance}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
