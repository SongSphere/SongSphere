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
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import ProfileCard from "../components/profile/profile-card";
import ProfileFeed from "../components/profile/profile-feed";
import { NoPosts } from "../components/profile/no-post";
import { useParams } from "react-router-dom";

interface IProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  service: string;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const ProfilePage = (props: IProfileProps) => {
  const { username } = useParams();
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username).then((user) => {
        console.log(user);
        setUser(user);
      });

      fetchPostsByUsername(username).then((posts) => {
        setPosts(posts);
      });
    }
  }, []);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-lblue">
      {/* <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} /> */}
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <ProfileCard user={user} />
        </div>
        <div className="col-span-2">
          {posts.length > 0 ? (
            <ProfileFeed
              posts={posts}
              setSong={setSong}
              setPost={setPost}
              setSelectEditPost={props.setSelectEditPost}
            />
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

export default ProfilePage;
