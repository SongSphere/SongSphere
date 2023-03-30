import { TMusicContent } from "../types/music-content";
import Session from "../session";
import fetchPostsByUsername from "../services/post/fetch-user-posts";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useState } from "react";
import { TPost } from "../types/post";
import { TUser } from "../types/user";
import RecentFeed from "../components/profile/recents-feed";
import AppleMusicPlayerCard from "../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../components/player/spotify-music-player-card";

const RecentsPage = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [user, setUser] = useState<TUser | null>(null);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [service, setService] = useState<string>("");
  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [Session.getUser()]);
  useEffect(() => {
    if (user) {
      fetchPostsByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="min-h-screen min-w-screen bg-lblue">
      <Navbar />
      <h1 className="text-4xl text-center text-white fixed-scroll">
        Recently Played
      </h1>
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center col-span-2 mt-5">
          <div className="w-4/5">
            <RecentFeed posts={posts} user={user} setSong={setSong} />
          </div>
        </div>
        <div className="mt-5">
          {service === "apple" ? (
            <AppleMusicPlayerCard selectedSong={song} />
          ) : (
            <SpotifyPlayerCard selectedSong={song} />
          )}
        </div>
      </div>
    </div>
  );
};
export default RecentsPage;
