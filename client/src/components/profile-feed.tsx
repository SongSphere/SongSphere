import { TPost } from "../types/post";
import Post from "../components/post";
import { useState } from "react";
import { TMusicContent } from "../types/music-content";

interface IProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
}

const ProfileFeed = (props: IProfileFeedProps) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return <Post post={post} key={post._id} setSong={props.setSong} />;
        })}
      </div>
    </div>
  );
};

export default ProfileFeed;
