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
import FailPopUp from "../popup/fail-popup";
import TaggedUserList from "../profile/tagged-user-list";
import parseTags from "../../utils/parse-tags";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const Post = (props: IPostProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [postFocusPage, setPostFocusPage] = useState(false);
  const [postOwner, setPostOwner] = useState<TUser | null>(null);

  // state that notify the sucess-fail-popup when to open
  const [deleteFailOpen, setDeleteFailOpen] = useState(false);
  const [libraryFailOpen, setlibraryFailOpen] = useState(false);

  const DELETE_ERR_MSG =
    "Oops! An error occurs when deleting the post. Try again later!";
  const LIBRARY_ERR_MSG =
    "Oops! An error occurs when adding to your library. Try again later!";

  let parsedCaption = parseTags(props.post.caption, props.post.taggedUsers);

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
      setPostOwner(postOwner);
    });
  }, []);

  return (
    <div className="flex w-full p-6 mb-8 transition ease-in-out rounded-lg delay-50 drop-shadow-md hover:bg-slate-800">
      {/* Only display edit function if this post belongs to the user */}
      {props.post.username == props.user.username && (
        <div className="dropdown">
          <button onClick={handleOpen} className="absolute top-5 right-5 ">
            <img width={20} src="/img/icons/three-dots.svg" />
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
                                })
                                .catch((error) => {
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
      )}

      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
          props.setSong(props.post.music);
        }}
      >
        <img className="rounded-sm" src={props.post.music.cover}></img>
      </div>

      <FailPopUp
        open={deleteFailOpen}
        setOpen={setDeleteFailOpen}
        failText={DELETE_ERR_MSG}
      />
      <FailPopUp
        open={libraryFailOpen}
        setOpen={setlibraryFailOpen}
        failText={LIBRARY_ERR_MSG}
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
        <div className="w-full p-2 ml-2 text-white">
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
          <div className="text-2xl font-bold ">{props.post.music.name}</div>
          <div className="">{props.post.music.artist}</div>
          <hr className="h-0.5 border-0 bg-slate-300"></hr>
          <div className="flex justify-end mt-2">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: parsedCaption }}
            ></div>
            {/* <div className="w-full">{parsedCaption}</div> */}
            <LikeButton
              id={props.post._id}
              type="Post"
              postUserEmail={props.post.userEmail}
            />
            <div
              className="w-6 h-6 mt-1 ml-2 cursor-pointer"
              onClick={() => {
                setPostFocusPage(true);
              }}
            >
              <img src="/img/icons/comment.svg"></img>
            </div>
            {postOwner?.isPrivate ? (
              <div></div>
            ) : (
              <div
                className="mt-1 ml-2 cursor-pointer w-7 h-7"
                onClick={() => {
                  navigate(`/repost/${props.post._id}`);
                }}
              >
                <img src="/img/icons/repost.svg"></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
