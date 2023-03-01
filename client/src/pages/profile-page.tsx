import { SetStateAction } from "react";
import { Link } from "react-router-dom";
import AppleMusicPlayerCard from "../components/apple-music-player-card";
import SpotifyPlayerCard from "../components/spotify-music-player-card";
import Navbar from "../components/navbar";
import { NoPosts } from "../components/no-posts";
import { PostGrid } from "../components/post-grid";

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
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <Navbar setUser={function (value: SetStateAction<TUser | null>): void {
        throw new Error("Function not implemented.");
      } } setIsLoggedIn={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } />
      <Link to="/settings">
      <button className="float-right">
        
            <img className="w-10 h-10 mt-5 mr-5"src="https://i.pinimg.com/originals/f1/a2/b2/f1a2b28af9d7aeafeec63cac6e1eb5ee.png" />
      </button> 
      </Link>
      <div className="flex">
 
      {props.service === "apple" ? (
          <AppleMusicPlayerCard
            musicInstance={props.appleMusicInstance}
            selectedSong={song}
          />
        ) : (
          <SpotifyPlayerCard user={props.user} selectedSong={song} />
        )}
          
        <div className="">
           {/* Profile pic conatiner*/}
          <p className="mx-7">{props.user?.givenName} {props.user?.familyName}</p>
            
          <img className="mx-10 my-5 rounded-3xl" height={150} width={150}src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2014/08/guy_fieri.jpg"/>
          <button className="mx-10 bg-white border-2 border-black rounded-full shadow-2xl">Edit Profile Image</button>
        </div>

          {/* Followers and bio container*/}
        <div className="">
              
          <ul className="my-10 lg:inline-flex :inline">
            <li className="px-10 text-center">
                  {posts ? '{posts.length}' : '0'} <br />
                  Posts
            </li>
            <li className="px-10 text-center">
                  # <br />
                  Followers 
            </li>
            <li className="px-10 text-center">
                  # <br />
                  Following
            </li>
          </ul>
          <p>I am Guy and I like Cheeseburgers and Katy Perry. My favorite things to do in my
                freetime are drive and go to dinners or drive ins.
          </p>  

          <div>
            {posts ?  PostGrid(posts) : <NoPosts /> }
          </div>

        </div>
          
        
      </div> {/** end of page grid */}

        <div className="col-span-2">
          {posts ? (
            <ProfileFeed posts={posts} setSong={setSong} />
          ) : (
            <div>fetching posts</div>
          )}
        </div>
        {props.service === "apple" ? (
          <AppleMusicPlayerCard
            musicInstance={props.appleMusicInstance}
            selectedSong={song}
          />
        ) : (
          <SpotifyPlayerCard user={props.user} selectedSong={song} />
        )}
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
