import { TUser } from "../types/user";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import Session from "../session";
import React from "react";
import SpotifyPlayerCard from "../components/player/spotify-music-player-card";
import AppleMusicPlayerCard from "../components/player/apple-music-player-card";
import { TMusicContent } from "../types/music-content";
import PlaylistFeed from "../components/profile/playlist-feed";
import { TPost } from "../types/post";
import fetchPostsByUsername from "../services/post/fetch-user-posts";

const PlaylistPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [followers, setFollowers] = React.useState(false);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [service, setService] = useState<string>("");
  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [Session.getUser()]);
  useEffect(() => {
    if (user) {
      if (user.following.length > 0) {
        setFollowers(true);
      }
      fetchPostsByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);
  if (!user) {
    return <div>fetching user</div>;
  }
  if (!!!followers) {
    return (
      <div className="min-h-screen m-w-screen bg-lblue">
        <Navbar />
        <div className="mt-10 text-center text-white scroll">
          <div className="text-4xl">
            You dont follow anyone yet, so we cant make a playlist for you.
          </div>
          <div className="text-2xl">
            Come back later to see a playlist created based on the people you
            follow!
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-h-screen min-h-screen overflow-hidden m-w-screen bg-lblue">
      <Navbar />
      <h1 className="mt-5 text-4xl text-center text-white">My Playlist</h1>
      <h1 className="text-xl text-center text-white">
        A custom playlist made just for you based on the people you follow
      </h1>

      <div className="grid grid-cols-3 min-h-[60%]">
        <div className="flex items-center justify-center w-full max-h-full col-span-2 mt-8 ml-8 rounded-lg bg-navy">
          <div className="w-full max-h-[100%] overflow-auto rounded-lg">
            <PlaylistFeed posts={posts} user={user} setSong={setSong} />
          </div>
        </div>
        <div className="">
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
export default PlaylistPage;
