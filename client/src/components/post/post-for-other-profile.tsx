import React from "react";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import Popup from "reactjs-popup";
import PostFocusPage from "../../pages/profile/post-focus-page";
import LikeButton from "./like-button";
import { useNavigate } from "react-router-dom";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { useState } from "react";
import { TUser } from "../../types/user";


interface IPostForOtherProfileProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  setRepost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const PostForOtherProfile = (props: IPostForOtherProfileProps) => {
  const [postFocusPage, setPostFocusPage] = React.useState(false);
  const closeModal = () => setPostFocusPage(false);
  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();
  const [poster, setPoster] = useState<TUser | null>(null);
  const handlePostFocusPage = () => {
    setPostFocusPage(!postFocusPage);
  };
  let navigate = useNavigate();

  fetchUserByUsername(props.post.username).then((user) => {
    setPoster(user);
  });
  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
          props.setSong(props.post.music);
        }}
      >
        <img src={props.post.music.cover}></img>
      </div>

      <Popup open={postFocusPage} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
            {postSuccessFail}
          </a>
        </div>
      </Popup>

      <div
        className=""
        onClick={() => {
          handlePostFocusPage();

          setPostSuccessFail(
            <PostFocusPage
              post={props.post}
              setSong={props.setSong}
              setPost={props.setPost}
            />
          );
        }}
      >
        <div className="pl-4 text-lg text-navy">
          {props.post.music.name}{" "}
          {props.post.music.artist ? " by " + props.post.music.artist : ""}
        </div>
        <div className="pl-4 text-navy">{props.post.caption}</div>
      </div>
      <div className="absolute bottom-5 right-5">
        
        <LikeButton 
          post={props.post}
          
        />
        { !!!poster?.isPrivate &&
        <button className="absolute bottom-2 text-lblue hover:text-navy right-10" 
            onClick={()=>{
                props.setRepost(props.post);
                navigate(`/repost/${props.post._id}`);
                }}>
                Repost
            </button>
        }
      </div>
    </div>
  );
};

export default PostForOtherProfile;
