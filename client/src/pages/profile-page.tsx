import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import Navbar from "../components/navbar";
import { TUser } from "../types/user";
import { useEffect, useState } from "react";
import { TPost } from "../types/post";

import fetchUserPosts from "../services/fetch-user-posts";
import ProfileFeed from "../components/profile-feed";
import { TMusicContent } from "../types/music-content";

interface IProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />
      <div className="grid grid-cols-4 gap-8">
        <div>
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
        </div>
        <div className="col-span-2">
          {/* <div className="flex justify-center mt-8">
            <div className="w-full bg-white">
              <div>hi</div>
            </div>
          </div> */}

          {posts ? (
            <ProfileFeed posts={posts} setSong={setSong} />
          ) : (
            <div>fetching posts</div>
          )}
        </div>
        {props.user.appleToken ? (
          <AppleMusicPlayerCard
            musicInstance={props.appleMusicInstance}
            id={song?.id}
          />
        ) : (
          <SpotifyPlayerCard user={props.user} />
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
  //     <Navbar setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn} />

  //     <div className="grid grid-cols-3">
  //       <div className="col-start-1 col-end-1">
  //         <p className="mx-7">place holder Guy Fieri</p>
  //         <img
  //           className="mx-10 my-5 rounded-3xl"
  //           height={150}
  //           width={150}
  //           src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2014/08/guy_fieri.jpg"
  //         />

  //         <button className="mx-10 bg-white border-2 border-black rounded-full shadow-2xl">
  //           Edit Profile Image
  //         </button>
  //       </div>

  //       <div className="col-start-2 col-end-2">
  //         <ul className="inline-flex my-10">
  //           <li className="px-10 text-center">
  //             # <br />
  //             Posts
  //           </li>
  //           <li className="px-10 text-center">
  //             # <br />
  //             Followers
  //           </li>
  //           <li className="px-10 text-center">
  //             # <br />
  //             Following
  //           </li>
  //         </ul>
  //         <p>
  //           I am Guy and I like Cheeseburgers and Katy Perry. My favorite things
  //           to do in my freetime are drive and go to dinners or drive ins.
  //         </p>
  //       </div>
  //       <div className="float-right col-start-3 col-end-3">
  //         <AppleMusicPlayerCard musicInstance={props.musicInstance} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProfilePage;
