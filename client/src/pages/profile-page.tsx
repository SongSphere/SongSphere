// import packages
import { useEffect, useState } from "react";

// import services
import fetchUserPosts from "../services/fetch-user-posts";

// import types
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";
import { TUser } from "../types/user";

// import components
import Navbar from "../components/navbar";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import ProfileCard from "../components/profile/profile-card";
import ProfileFeed from "../components/profile/profile-feed";

interface IProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  service: string;
}

const ProfilePage = (props: IProfileProps) => {
  const [posts, setPosts] = useState<TPost[] | null>(null);
  const [song, setSong] = useState<TMusicContent | null>(null);

  useEffect(() => {
    const updatePosts = async (email: string) => {
      setPosts(await fetchUserPosts(email));
    };
    if (props.user) {
      updatePosts(props.user.email);
    }
  }, [props.user]);

  if (!props.user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-lblue">
      <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <ProfileCard  user={props.user} />
        </div>
        <div className="col-span-2">
          {posts ? (
            <ProfileFeed posts={posts} setSong={setSong} />
          ) : (
            <div>fetching posts</div>
          )}
        </div>
        <div className="">
          {props.service === "apple" ? (
            <AppleMusicPlayerCard
              musicInstance={props.appleMusicInstance}
              selectedSong={song}
            />
          ) : (
            <SpotifyPlayerCard user={props.user} selectedSong={song} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
