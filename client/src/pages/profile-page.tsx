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

      <button className="float-right">
            <img className="w-10 h-10 mt-5 mr-5"src="https://i.pinimg.com/originals/f1/a2/b2/f1a2b28af9d7aeafeec63cac6e1eb5ee.png" />
      </button> 
      <div className="flex">
 
            <AppleMusicPlayerCard musicInstance={props.musicInstance} />
          
        <div className="">
           {/* Profile pic conatiner*/}
          <p className="mx-7">place holder Guy Fieri</p>
            
          <img className="mx-10 my-5 rounded-3xl" height={150} width={150}src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2014/08/guy_fieri.jpg"/>
          <button className="mx-10 bg-white border-2 border-black rounded-full shadow-2xl">Edit Profile Image</button>
        </div>

          {/* Followers and bio container*/}
        <div className="">
              
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
          
        <div> {/** Post grid */}
  
        </div>

      </div> {/** end of page grid */}
      
    </div>
  );
};

export default ProfilePage;
