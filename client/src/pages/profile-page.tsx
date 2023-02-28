import AppleMusicPlayerCard from "../components/apple-music-player-card";
import NewNavbar from "../components/new-navbar";
import PImg from "../components/profile-image";
import BImg from "../components/background-image";
import { render } from "@testing-library/react";

interface IProfileProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const ProfilePage = (props: IProfileProps) => {
  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-slate-100">
      <NewNavbar />

      
      <div className="grid grid-cols-3">

      <div className="float-right col-start-1 col-end-1">
          <AppleMusicPlayerCard musicInstance={props.musicInstance} />
        </div>
        
        <div className="col-start-2 col-end-2">
          {/* Profile pic conatiner*/}
          <p className="mx-7">place holder Guy Fieri</p>
          
          <img className="mx-10 my-5 rounded-3xl" height={150} width={150}src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2014/08/guy_fieri.jpg"/>
          <button className="mx-10 bg-white border-2 border-black rounded-full shadow-2xl">Edit Profile Image</button>
        </div>

        {/* Followers and bio container*/}
        <div className="col-start-3 col-end-3">
            
            <ul className="my-10 lg:inline-flex :inline">
              <li className="px-10 text-center">
                # <br />
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
            
        </div>
      
          {/* Post Container */}
        <div className="col-start-1 col-end-2">

        </div>
      </div>
      
    </div>
  );
};

export default ProfilePage;
