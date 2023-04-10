import { useEffect, useState } from "react";
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import { TUser } from "../../types/user";
import { TMusicContent } from "../../types/music-content";
import Session from "../../session";
import { randomSongSpotifyFromBackend } from "../../services/spotify/spotify-search";
import FriendActivityCard from "../../components/feed/friend-activity";
import Navbar from "../../components/navbar";
import RandomSongPost from "../../components/feed/random-song-content";

const CreateRoomPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [randomSong, setRandomSong] = useState<TMusicContent | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [user]);

  if (!user) {
    return <div>fethcing user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-lblue min-w-screen">
      <Navbar />
      <div className="grid grid-cols-4 gap-2 md:grid-flow-col">
        <FriendActivityCard />
        <div className="col-span-2">
          {user.showRandomSong ? (
            <RandomSongPost song={randomSong} user={user} />
          ) : (
            <div></div>
          )}
          <div className="w-full p-4 mt-8 bg-white rounded-lg h-4/5">
            <div className="mt-4 text-xl font-bold text-center">
              Create Party Room
            </div>
            <form>
              <label>
                Party Room Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        {service === "apple" ? (
          <AppleMusicPlayerCard selectedSong={song} />
        ) : (
          <SpotifyPlayerCard selectedSong={song} />
        )}
      </div>
    </div>
  );
};

export default CreateRoomPage;
