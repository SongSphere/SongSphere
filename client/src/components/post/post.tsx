import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import deletePost from "../../services/post/delete-post";
import PostFocusPage from "../../pages/profile/post-focus-page";
import Popup from "reactjs-popup";
import { TUser } from "../../types/user";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import LikeButton from "./like-button";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const Post = (props: IPostProps) => {
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
    fetchUserByUsername(props.post.username).then((postOwner) => {
      setPostOwner(postOwner);
    });
  }, []);

  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      {/* Only display edit function if this post belongs to the user */}
      {props.post.username == props.user.username ? (
        <div className="dropdown">
          <button onClick={handleOpen} className="absolute top-5 right-5 ">
            <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
          </button>
          {open ? (
            <ul className="absolute right-0 top-10">
              <li className=" text-lblue hover:text-lgrey">
                <button
                  onClick={() => {
                    navigate(`/edit/${props.post._id}`);
                  }}
                >
                  Edit
                </button>
              </li>

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
          props.setSong(props.post.music);
        }}
      >
        <img src={props.post.music.cover}></img>
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
        onClick={() => {
          handlePostFocusPage();
          setPostSuccessFail(
            <PostFocusPage post={props.post} setSong={props.setSong} />
          );
        }}
      >
        <div className="w-full p-2 ml-2">
          <div>
            {postOwner ? (
              <a href={`/user/${postOwner.username}`}>
                <img
                  className="inline w-8 h-8 rounded-full"
                  src={postOwner.profileImgUrl}
                ></img>
                <span className="inline pl-2 font-bold">
                  {postOwner.username}
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
          <hr className="h-0.5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="">{props.post.caption}</div>
        </div>
        <div className="pl-4 text-navy">{props.post.caption} </div>
      </div>
      <div className="absolute bottom-5 right-5">
        <LikeButton post={props.post} />
        <button
          className="absolute bottom-2 text-lblue hover:text-navy right-10"
          onClick={() => {
            navigate(`/repost/${props.post._id}`);
          }}
        >
          Repost
        </button>
      </div>
    </div>
  );
};

export default Post;
