import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../components/post/like-button";
import fetchComments from "../../services/post/fetch-comments";
import { TComment } from "../../types/comment";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import Session from "../../session";
import CommentLoader from "../../components/post/comment-loader";
import CommentCreater from "../../components/post/comment-creater";

interface IPostFocusPageProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  postOwner: TUser | null;
  setPostFocusPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostFocusPage = (props: IPostFocusPageProps) => {
  let [comments, setComments] = useState<TComment[] | null>(null);
  let [user, setUser] = useState<TUser | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (props.post._id) {
      fetchComments(props.post._id).then((comments) => {
        setComments(comments);
      });
    }
    setUser(Session.getUser());
  }, []);

  if (!user || !comments) {
    return <div>fetching user and comments</div>;
  }

  return (
    <div className="grid w-screen h-screen grid-cols-4 gap-2 md:grid-flow-col">
      <div className="relative col-span-2 col-start-2 mt-24 bg-white rounded-lg h-5/6 drop-shadow-md">
        <div
          className="absolute cursor-pointer right-4 top-4"
          onClick={() => {
            props.setPostFocusPage(false);
          }}
        >
          <img className="w-4 h-4" src="\img\icons\close.svg"></img>
        </div>
        <div className="flex w-full p-6">
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
              <div className="relative">
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
              <hr className="h-0.5 border-0 bg-gray-300"></hr>
              <div className="flex justify-end mt-2">
                <div className="w-full">{props.post.caption}</div>
                <LikeButton id={props.post._id} type="Post" />
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
        <hr className="h-0.5 bg-gray-300 border-0 "></hr>
        <div className="fixed w-full mt-2">
          <CommentCreater user={user} id={props.post._id!} commentType="Post" />
        </div>
        <hr className="w-full mt-16 h-0.5 bg-gray-300 border-0 "></hr>
        <div className="overflow-auto h-96">
          <div className="overflow-auto h-88">
            <CommentLoader comments={comments} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFocusPage;
