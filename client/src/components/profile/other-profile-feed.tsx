import { TPost } from "../../types/post";
import { TMusicContent } from "../../types/music-content";
import PostForOtherProfile from "../post-for-other-profile";
import React from "react";

interface IOtherProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const OtherProfileFeed = (props: IOtherProfileFeedProps) => {
  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return (
            <PostForOtherProfile
              post={post}
              key={post._id}
              setSong={props.setSong}
              setPost={props.setPost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtherProfileFeed;
