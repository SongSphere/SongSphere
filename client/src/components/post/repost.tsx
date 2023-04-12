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
import { addToSpotifyLibrary } from "../../services/spotify/add-to-library";
import Session from "../../session";
import selectService from "../../services/user/select-service";
import { addToAppleLibrary } from "../../services/apple/add-to-library";
import SucessFailPopUp from "../popup/sucess-fail-popup";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const Post = (props: IPostProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [postFocusPage, setPostFocusPage] = useState(false);
  const [postOwner, setPostOwner] = useState<TUser | null>(null);
  const [postRepost, setPostRepost] = useState<TUser | null>(null);

  // state that notify the sucess-fail-popup when to open
  const [deleteFailOpen, setDeleteFailOpen] = useState(false);
  const [deleteFailText, setDeleteFailText] = useState("");
  const [libraryFailOpen, setlibraryFailOpen] = useState(false);
  const [libraryFailText, setLibraryFailText] = useState("");

  const DELETE_ERR_MSG =
    "Oops! An error occurs when deleting the post. Try again later!";
  const LIBRARY_ERR_MSG =
    "Oops! An error occurs when adding to your library. Try again later!";

  const parts = props.post.caption.split(";");

  const closeModal = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "modal-container") {
      setEditOpen(false);
    }
  };

  const handleOpen = () => {
    setEditOpen(!editOpen);
  };

  let navigate = useNavigate();

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

  return (
    <div className="flex w-full p-6 mb-8 bg-white rounded-lg drop-shadow-md">
      {/* Only display edit function if this post belongs to the user */}
      {props.post.username == props.user.username ? (
        <div className="dropdown">
          <button onClick={handleOpen} className="absolute top-5 right-5 ">
            <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
          </button>
          {editOpen ? (
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
                        await deletePost(props.post)
                          .then((res) => {
                            setTimeout(() => {
                              window.location.reload();
                            }, 1500);
                          })
                          .catch((err) => {
                            setDeleteFailText(DELETE_ERR_MSG);
                            setDeleteFailOpen(true);
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
                        let u: TUser | null = Session.getUser();
                        if (u) {
                          let a = Session.getAMInstance();
                          if (a && props.post.music.service != undefined) {
                            if (u.defaultPlatform == "apple") {
                              selectService(
                                props.post.music,
                                a,
                                u,
                                u.defaultPlatform
                              )
                                .then(async (id) => {
                                  if (a) {
                                    await addToAppleLibrary(id, a);
                                  }
                                })
                                .catch((error) => {
                                  setLibraryFailText(LIBRARY_ERR_MSG);
                                  setlibraryFailOpen(true);
                                });
                            } else {
                              await selectService(
                                props.post.music,
                                a,
                                u,
                                u.defaultPlatform
                              )
                                .then(async (id) => {
                                  await addToSpotifyLibrary(
                                    id,
                                    props.user.spotifyToken
                                  );
                                  setLibraryFailText("");
                                })
                                .catch((error) => {
                                  setLibraryFailText(LIBRARY_ERR_MSG);
                                  setlibraryFailOpen(true);
                                });
                            }
                          }
                          setEditOpen(false);
                        }
                        setEditOpen(false);
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

      <SucessFailPopUp
        open={deleteFailOpen}
        setOpen={setDeleteFailOpen}
        failText={deleteFailText}
      />
      <SucessFailPopUp
        open={libraryFailOpen}
        setOpen={setlibraryFailOpen}
        failText={libraryFailText}
      />

      <Popup
        open={postFocusPage}
        onClose={() => {
          setPostFocusPage(false);
        }}
      >
        <PostFocusPage
          post={props.post}
          setSong={props.setSong}
          postOwner={postOwner}
          setPostFocusPage={setPostFocusPage}
        />
      </Popup>

      <div className="w-full">
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
        <div className="float-left mt-1.5 mr-2 text-navy"></div>
        <LikeButton
          id={props.post._id}
          type="Post"
          postUserEmail={props.post.userEmail}
        />
      </div>
    </div>
  );
};

export default Post;
