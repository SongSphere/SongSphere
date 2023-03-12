import React from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Switch from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditPage from "../pages/edit-page";
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";
import deletePost from "../services/delete-post";
import PostFocusPage from "../pages/post-focus-page";
import Popup from "reactjs-popup";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const Post = (props: IPostProps) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [postFocusPage, setPostFocusPage] = React.useState(false);
  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();
  const [deleteSuccessText, setDeleteSuccessText] = React.useState<string>("");

  const closeModal = () => setPostFocusPage(false);
  const closeDeleteSuccess = () => setOpen2(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePostFocusPage = () => {
    setPostFocusPage(!postFocusPage);
  };
  let navigate = useNavigate();

  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      <div className="dropdown">
        <button onClick={handleOpen} className="absolute top-5 right-5 ">
          <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
        </button>
        {open ? (
          <ul className="absolute right-0 top-10">
            <li className=" text-lblue hover:text-lgrey">
              <button
                onClick={() => {
                  props.setSelectEditPost(props.post);
                  navigate("/edit");
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
        ) : null}
      </div>

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
    </div>
  );
};

export default Post;
