import { TPost } from "../../types/post";
import { TMusicContent } from "../../types/music-content";
// import PostForOtherProfile from "../post/post-for-other-profile";
import Post from "../post/post";
import React, { useEffect } from "react";
import { TUser } from "../../types/user";
import Repost from "../post/repost";

interface IOtherProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const OtherProfileFeed = (props: IOtherProfileFeedProps) => {
  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          const repost = post.repost;

          if (repost) {
            return (
              <Repost
                user={props.user}
                post={post}
                key={post._id}
                setSong={props.setSong}
              />
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
        :
      </div>
    </div>
  );
};

export default OtherProfileFeed;
