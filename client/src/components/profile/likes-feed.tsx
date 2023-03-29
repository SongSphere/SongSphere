import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import { TMusicContent } from "../../types/music-content";
import Post from "../post/post";
import Repost from "../post/repost";
import { useEffect } from "react";

interface IProfileFeedProps {
    posts: TPost[];
    user: TUser;
    setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  }
  
  const LikeFeed = (props: IProfileFeedProps) => {
    return (
      <div className="justify-center mt-8">
        <div className="w-full">
        {props.posts.map((post) => {
          const repost = post.repost;

          if (repost) {
            return (
              <Repost post={post} key={post._id} setSong={props.setSong} />
            );
          } else {
            return (
              <Post
                post={post}
                key={post._id}
                setSong={props.setSong}
                user={props.user}
              />
            );
          }
        })}
        </div>
      </div>
    );
  };
  
  export default LikeFeed;