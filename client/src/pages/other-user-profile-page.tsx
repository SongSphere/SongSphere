import { useEffect, useState } from "react";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import Navbar from "../components/navbar";
import { NoPosts } from "../components/profile/no-post";
import OtherUserProfileCard from "../components/profile/other-user-profile-card";
import ProfileFeed from "../components/profile/profile-feed";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import fetchUserPosts from "../services/fetch-user-posts";
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";
import { TUser } from "../types/user";

interface IOtherUserProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  service: string;
}

const OtherUserProfilePage = (props: IOtherUserProfileProps) => {
  const [posts, setPosts] = useState<TPost[] | null>(null);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [post, setPost] = useState<TPost | null>(null);

  console.log(props.service);

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
          <OtherUserProfileCard user={props.user} setUser={props.setUser} />
        </div>
        <div className="col-span-2">
          {posts ? (
            <ProfileFeed posts={posts} setSong={setSong} setPost={setPost} />
          ) : (
            <NoPosts />
          )}
        </div>
        {props.service === "apple" ? (
          <AppleMusicPlayerCard
            user={props.user}
            service={props.service}
            musicInstance={props.appleMusicInstance}
            selectedSong={song}
          />
        ) : (
          <SpotifyPlayerCard
            user={props.user}
            selectedSong={song}
            appleMusicInstance={props.appleMusicInstance}
            service={props.service}
          />
        )}
      </div>
    </div>
  );
};

export default OtherUserProfilePage;
