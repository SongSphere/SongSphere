import { TPost } from "../../types/post";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import Repost from "../post/repost";
import { useState } from "react";

interface IProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
  // setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  // setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  // setRepost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const ProfileFeed = (props: IProfileFeedProps) => {
  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          const repost = post.repost;
          let type;

          if (!!!repost) {
            type = (
              <Post
                post={post}
                key={post._id}
                setSong={props.setSong}
                user={props.user}
                // setPost={props.setPost}
                // setSelectEditPost={props.setSelectEditPost}
                // setRepost={props.setRepost}
              />
            );
          } else {
            type = (
              <Repost
                post={post}
                key={post._id}
                setSong={props.setSong}
                // setPost={props.setPost}
                // setSelectEditPost={props.setSelectEditPost}
                // setRepost={props.setRepost}
              />
            );
          }

          return type;
        })}
      </div>
    </div>
  );
};

export default ProfileFeed;
