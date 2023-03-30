import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import { TMusicContent } from "../../types/music-content";
import RecentSong from "./recent-song";
import { useEffect } from "react";

interface IRecentsFeedProps {
    posts: TMusicContent[];
    user: TUser;
    setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  }
  
  const RecentFeed = (props: IRecentsFeedProps) => {
    return (
      <div className="justify-center mt-8">
        <div className="w-full">
        {props.posts.map((post) => {
          return (
            <RecentSong song={post} user={props.user} setSong={props.setSong}/>
          );
        })}
        </div>
      </div>
    );
  };
  
  export default RecentFeed;