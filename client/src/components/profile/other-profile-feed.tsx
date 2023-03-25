import { TPost } from "../../types/post";
import { TMusicContent } from "../../types/music-content";
// import PostForOtherProfile from "../post/post-for-other-profile";
import Post from "../post/post";
import React, { useEffect } from "react";
import { TUser } from "../../types/user";

interface IOtherProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  selectedUser: TUser | null;
  blur: boolean;
  user: TUser;
}

const OtherProfileFeed = (props: IOtherProfileFeedProps) => {
  useEffect(() => {
    console.log(`The page should be ${props.blur}`);
  });

  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return (
            <Post
              post={post}
              key={post._id}
              setSong={props.setSong}
              user={props.user}
            />
          );
        })}
        :
      </div>
    </div>
  );
};

export default OtherProfileFeed;
