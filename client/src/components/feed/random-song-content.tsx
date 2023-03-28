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
  user: TUser;
}

const RandomSongPost = (props: IPostProps) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [postFocusPage, setPostFocusPage] = useState(false);
  const [postSuccessFail, setPostSuccessFail] = useState<JSX.Element>();
  const [deleteSuccessText, setDeleteSuccessText] = useState<string>("");
  const [postOwner, setPostOwner] = useState<TUser | null>(null);

  const closeModal = () => setPostFocusPage(false);
  const closeDeleteSuccess = () => setOpen2(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePostFocusPage = () => {
    setPostFocusPage(!postFocusPage);
  };
  let navigate = useNavigate();

  useEffect(() => {
    // fetchUserByUsername(props.post.username).then((postOwner) => {
    //   setPostOwner(postOwner);
    // });
  }, []);
  
  if(!props.song) {
    return <div>Fetching song</div>
  }

  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      {/* Only display edit function if this post belongs to the user */}
      {true ? (
        <div className="dropdown">
          <button onClick={handleOpen} className="absolute top-5 right-5 ">
            <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
          </button>
          {open ? (
            <ul className="absolute right-0 top-10">
              <li className=" text-lblue hover:text-lgrey">
              </li>

              <li>
     
              </li>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
        //   props.setSong(props.post.music);
        }}
      >
        <img src={props.song.cover}></img>
      </div>


      <div
        className="w-full"
        onClick={() => {
 
        }}
      >
        <div className="w-full p-2 ml-2">

          <div className="text-2xl font-bold">{"Random Song of the Day"}</div>
          <div className="text-slate-500">{props.song.artist}</div>
          <hr className="h-0.5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="">{props.song.albumName}</div>
        </div>
      </div>
      
    </div>
  );
};

export default RandomSongPost;
