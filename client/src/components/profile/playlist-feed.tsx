import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import { TMusicContent } from "../../types/music-content";
import PlaylistSong from "./playlist-song";
import { useEffect } from "react";

interface IPlaylistFeedProps {
    posts: TPost[];
    user: TUser;
    setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  }
  
  const PlaylistFeed = (props: IPlaylistFeedProps) => {
    return (
      <div className="justify-center">
        <div className="w-full">
        {props.posts.map((post) => {
          return (
            <PlaylistSong song={post.music} user={props.user} setSong={props.setSong}/>
          );
        })}
        </div>
      </div>
    );
  };
  
  export default PlaylistFeed;