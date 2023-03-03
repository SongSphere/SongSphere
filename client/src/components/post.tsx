import React from "react";
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
}

const Post = (props: IPostProps) => {
  const [open, setOpen] = React.useState(false);
  const [postFocusPage, setPostFocusPage] = React.useState(false);
  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();
  const closeModal = () => setPostFocusPage(false);


  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePostFocusPage = () => {
    setPostFocusPage(!postFocusPage);
  };


  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      <div className="dropdown">
        <button onClick={handleOpen} className="flex mr-5">
          <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
        </button>
        {open ? (
          <ul>
            <li>
              <button
                onClick={() => {
                  <EditPage post={props.post} />;
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  deletePost(props.post);
                  window.location.reload();
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
    
          setPostSuccessFail(<
            PostFocusPage 
              post={props.post}
              setSong={props.setSong}
              setPost={props.setPost}
            />);
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
