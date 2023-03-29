import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../components/post/like-button";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";

interface IPostFocusPageProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  postOwner: TUser | null;
}

const PostFocusPage = (props: IPostFocusPageProps) => {
  let navigate = useNavigate();

  return (
    <div className="grid w-screen h-screen grid-cols-4 gap-2 md:grid-flow-col">
      <div className="col-span-2 col-start-2 mt-24">
        <div className="flex w-full p-6 mb-8 bg-white rounded-lg drop-shadow-md h-5/6">
          <div
            className="w-32 h-32 cursor-pointer"
            onClick={() => {
              props.setSong(props.post.music);
            }}
          >
            <img className="rounded-sm" src={props.post.music.cover}></img>
          </div>

          <div className="w-full">
            <div className="w-full p-2 ml-2">
              <div>
                {props.postOwner ? (
                  <a href={`/user/${props.postOwner.username}`}>
                    <img
                      className="inline w-8 h-8 rounded-full"
                      src={props.postOwner.profileImgUrl}
                    ></img>
                    <span className="inline pl-2 font-bold">
                      {props.postOwner.username}
                    </span>
                  </a>
                ) : (
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/img/blank_user.png"
                  ></img>
                )}
              </div>
              <div className="text-2xl font-bold">{props.post.music.name}</div>
              <div className="float-right pr-2 text-navy">
                Likes: {props.post.likes}
              </div>
              <div className="text-slate-500">{props.post.music.artist}</div>
              <hr className="h-0.5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="flex justify-end mt-2">
                <div className="w-full">{props.post.caption}</div>
                <LikeButton post={props.post} />
                <div
                  className="mt-1 ml-2 cursor-pointer w-7 h-7"
                  onClick={() => {
                    navigate(`/repost/${props.post._id}`);
                  }}
                >
                  <img src="/img/icons/repost.svg"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFocusPage;
