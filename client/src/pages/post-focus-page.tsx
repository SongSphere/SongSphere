import React from "react";
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";

interface IPostFocusPageProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const PostFocusPage = (props: IPostFocusPageProps) => {
  return (
    <div className="px-4 py-3 text-teal-900 bg-white border-t-4 border-white rounded-b shadow-md ">
      <div
        className="w-128 h-128 cursor-pointer"
        onClick={() => {
          props.setSong(props.post.music);
        }}
      >
        <img className="w-128 h-128" src={props.post.music.cover}></img>
      </div>

      <div className="">
        <div className="pt-6 pl-4 text-lg text-navy">
          {props.post.music.name}{" "}
          {props.post.music.artist ? " by " + props.post.music.artist : ""}
        </div>
        <div className="pl-4 text-navy">{props.post.caption}</div>
      </div>
    </div>
  );
};

export default PostFocusPage;
