import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import deletePost from "../../services/post/delete-post";
import PostFocusPage from "../../pages/profile/post-focus-page";
import Popup from "reactjs-popup";
import { TUser } from "../../types/user";
import fetchUserByUsername from "../../services/user/fetch-user-username";

interface IPostProps {
  song: TMusicContent | null;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const RandomSongPost = (props: IPostProps) => {
  useEffect(() => {}, []);

  if (!props.song) {
    return <div>Fetching song</div>;
  }

  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
          props.setSong(props.song);
        }}
      >
        <img src={props.song.cover}></img>
      </div>

      <div className="w-full" onClick={() => {}}>
        <div className="w-full p-2 ml-2">
          <div className="text-2xl font-bold">{"Random Song of the Day"}</div>
          <div className="text-slate-500">{props.song.artist}</div>
          <hr className="h-0.5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="">{props.song.name}</div>
        </div>
      </div>
    </div>
  );
};

export default RandomSongPost;
