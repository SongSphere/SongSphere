import React from "react";
import { useNavigate } from "react-router-dom";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import deletePost from "../../services/post/delete-post";
import PostFocusPage from "../../pages/profile/post-focus-page";
import Popup from "reactjs-popup";
import LikeButton from "./like-button";
import { useState } from "react";
import { TUser } from "../../types/user";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { useEffect } from "react";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
}

const Repost = (props: IPostProps) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [postFocusPage, setPostFocusPage] = React.useState(false);
  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();
  const [deleteSuccessText, setDeleteSuccessText] = React.useState<string>("");
  const [postRepost, setPostRepost] = useState<TUser | null>(null);
  const [postOwner, setPostOwner] = useState<TUser | null>(null);

  const closeModal = () => setPostFocusPage(false);
  const closeDeleteSuccess = () => setOpen2(false);
  const parts = props.post.caption.split(";");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePostFocusPage = () => {
    setPostFocusPage(!postFocusPage);
  };
  useEffect(() => {
    fetchUserByUsername(props.post.username).then((postOwner) => {
      setPostRepost(postOwner);
    });
  }, []);
  useEffect(() => {
    fetchUserByUsername(parts[2]).then((postOwner) => {
      setPostOwner(postOwner);
    });
  }, []);
  let navigate = useNavigate();

  return (
    <div className="flex w-full p-6 mb-8 bg-white rounded-lg drop-shadow-md">
      <div className="dropdown">
        <button onClick={handleOpen} className="absolute top-5 right-5 ">
          <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
        </button>

        {open ? (
          <ul className="absolute right-0 top-10">
            <li>
              <button
                className=" text-lblue hover:text-lgrey"
                onClick={async () => {
                  await deletePost(props.post).then((res) => {
                    setOpen2(true);
                    // temp solution
                    if (res) {
                      setDeleteSuccessText("Success");
                    } else {
                      setDeleteSuccessText("Fail");
                    }

                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
                  });
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="grid items-center justify-center grid-flow-rol">
        <img
          className="absolute top-9 left-16"
          width={25}
          src="https://www.clipartmax.com/png/full/241-2417826_transparent-circular-arrow-icon.png"
        />
        <div
          className="w-32 h-32 cursor-pointer"
          onClick={() => {
            props.setSong(props.post.music);
          }}
        >
          <img src={props.post.music.cover}></img>
        </div>
      </div>

      <Popup open={open2} closeOnDocumentClick onClose={closeDeleteSuccess}>
        <div className="modal">
          <a className="close" onClick={closeDeleteSuccess}>
            &times;
          </a>
          {deleteSuccessText}
        </div>
      </Popup>

      <Popup open={postFocusPage} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
            {postSuccessFail}
          </a>
        </div>
      </Popup>

      <div
        className="w-full"
        // onClick={() => {
        //   handlePostFocusPage();

        //   setPostSuccessFail(
        //     <PostFocusPage post={props.post} setSong={props.setSong} />
        //   );
        // }}
      >
        <div className="w-full p-2 ml-2">
          <div className="ml-5">
            {postRepost ? (
              <a href={`/user/${postRepost.username}`}>
                <img
                  className="inline w-8 h-8 rounded-full"
                  src={postRepost.profileImgUrl}
                ></img>
                <span className="inline pl-2 font-bold">
                  {postRepost.username}
                </span>
              </a>
            ) : (
              <img
                className="w-8 h-8 rounded-full"
                src="/img/blank_user.png"
              ></img>
            )}
          </div>
          <div className="p-5 mt-5 border-4 border-solid border-lgrey">
            <div>
              {postOwner ? (
                <a href={`/user/${postOwner.username}`}>
                  <img
                    className="inline w-8 h-8 rounded-full"
                    src={postOwner.profileImgUrl}
                  ></img>
                  <span className="inline pl-2 font-bold">
                    Resposted from {postOwner.username}
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
            <div className="text-slate-500">{props.post.music.artist}</div>
            <div className="">{parts[0]}</div>
          </div>
          <div className="mb-3 ml-5 text-slate-500">{parts[1]}</div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5">
        <div className="float-left mt-1.5 mr-2 text-navy">
          {props.post.likes}
        </div>
        <LikeButton id={props.post._id} type="Post" />
      </div>
    </div>
  );
};

export default Repost;
