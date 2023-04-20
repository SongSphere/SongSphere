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
import FriendActivityCard from "../components/feed/friend-activity";

import MainLayout from "../layouts/main-layout";

const HomePage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
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
    return <div></div>;
  }

  const left = <FriendActivityCard />;
  const middle = (
    <div>
      {user.showRandomSong ? (
        <RandomSongPost song={randomSong} user={user} setSong={setSong} />
      ) : (
        <div></div>
      )}
      <Feed setSong={setSong} user={user} />
    </div>
  );
  const right = (
    <div>
      {service === "apple" ? (
        <AppleMusicPlayerCard selectedSong={song} />
      ) : (
        <SpotifyPlayerCard selectedSong={song} />
      )}
    </div>
  );

  return <MainLayout left={left} middle={middle} right={right} />;
};

export default HomePage;
