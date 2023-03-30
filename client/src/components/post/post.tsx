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
import { addToLibrary } from "../../services/spotify/add-to-library";

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

  const closeModal = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "modal-container") {
      setOpen(false);
    }
  };

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
    <div className="flex w-full p-6 mb-8 bg-white rounded-lg drop-shadow-md">
      {/* Only display edit function if this post belongs to the user */}
      {props.post.username == props.user.username ? (
        <div className="dropdown">
          <button onClick={handleOpen} className="absolute top-5 right-5 ">
            <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
          </button>
          {open ? (
            <div
              id="modal-container"
              onClick={closeModal}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
            >
              <div className="w-1/4 p-4 bg-gray-200 rounded-md">
                <ul>
                  <li className="px-2 py-1 rounded-sm">
                    <button
                      className="w-full py-2 text-xs text-white transition-colors duration-200 rounded-sm bg-lblue hover:bg-gray-800"
                      onClick={() => {
                        navigate(`/edit/${props.post._id}`);
                      }}
                    >
                      Edit
                    </button>
                  </li>

                  <li className="px-2 py-1 rounded-sm">
                    <button
                      className="w-full py-2 text-xs text-white transition-colors duration-200 rounded-sm bg-lblue hover:bg-gray-800"
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
                  <li className="px-2 py-1 rounded-sm">
                    <button
                      className="w-full py-2 text-xs text-white transition-colors duration-200 rounded-sm bg-lblue hover:bg-gray-800"
                      onClick={async () => {
                        await addToLibrary(
                          props.post.music.id,
                          props.user.spotifyToken
                        );
                        setOpen(false);
                      }}
                    >
                      Add to my library
                    </button>
                  </li>
                </ul>
              </div>
            </div>
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
        <img className="rounded-sm" src={props.post.music.cover}></img>
      </div>

      <Popup open={open2} closeOnDocumentClick onClose={closeDeleteSuccess}>
        <div className="modal">
          <a className="close" onClick={closeDeleteSuccess}>
            &times;
          </a>
          {deleteSuccessText}
        </div>
      </Popup>

      <Popup
        open={postFocusPage}
        closeOnDocumentClick
        onClose={() => {
          setPostFocusPage(false);
        }}
      >
        <div className="modal">
          <a
            className="close"
            onClick={() => {
              setPostFocusPage(false);
            }}
          >
            {postSuccessFail}
          </a>
        </div>
      </Popup>

      <div className="w-full">
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
          <div className="float-right pr-2 text-navy">
            Likes: {props.post.likes}
          </div>
          <div className="text-slate-500">{props.post.music.artist}</div>
          <hr className="h-0.5 border-0 bg-gray-300"></hr>
          <div className="flex justify-end mt-2">
            <div className="w-full">{props.post.caption}</div>
            <LikeButton post={props.post} />
            <div
              className="w-6 h-6 mt-1 ml-2 cursor-pointer"
              onClick={() => {
                handlePostFocusPage();
                setPostSuccessFail(
                  <PostFocusPage
                    post={props.post}
                    setSong={props.setSong}
                    postOwner={postOwner}
                  />
                );
              }}
            >
              <img src="/img/icons/comment.svg"></img>
            </div>
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
  );
};

export default Post;
