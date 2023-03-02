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
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
      <div className="grid grid-cols-4 gap-8">
        <ProfileCard user={props.user} />
        {/* <div>
          <p className="mx-7">place holder Guy Fieri</p>
          <img
            className="mx-10 my-5 rounded-3xl"
            height={150}
            width={150}
            src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2014/08/guy_fieri.jpg"
          />

          <button className="mx-10 bg-white border-2 border-black rounded-full shadow-2xl">
            Edit Profile Image
          </button>
        </div> */}
        <div className="col-span-2">
          {posts ? (
            <ProfileFeed posts={posts} setSong={setSong} />
          ) : (
            <div>fetching posts</div>
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

export default ProfilePage;
