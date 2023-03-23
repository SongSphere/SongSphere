// import packages
import { useEffect, useState } from "react";

// import services
import fetchUserByUsername from "../services/user/fetch-user-username";
import fetchPostsByUsername from "../services/user/fetch-user-posts";

// import types
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";
import { TUser } from "../types/user";

// import components
import Navbar from "../components/navbar";
import AppleMusicPlayerCard from "../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../components/player/spotify-music-player-card";
import ProfileCard from "../components/profile/profile-card";
import ProfileFeed from "../components/profile/profile-feed";
import { NoPosts } from "../components/profile/no-post";
import Session from "../session";

interface IProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const ProfilePage = (props: IProfileProps) => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
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
    <div className="w-full h-full min-h-screen min-w-screen bg-lblue">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <ProfileCard user={user} />
        </div>
        <div className="col-span-2">
          {posts.length > 0 ? (
            <ProfileFeed posts={posts} setSong={setSong} />
          ) : (
            <NoPosts />
          )}
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

export default ProfilePage;
