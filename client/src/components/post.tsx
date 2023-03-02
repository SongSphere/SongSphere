import { Link } from "react-router-dom";
import EditPage from "../pages/edit-page";
import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";


interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const Post = (props: IPostProps) => {
  return (
    <div className="flex w-full p-6 mb-8 bg-white drop-shadow-md">
      
        <button className="flex text-lblue hover:text-navy" onClick={ () =>
        {
          props.setPost(props.post);
        }}>Edit</button>
      
      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
          props.setSong(props.post.music);
        }}
      >
        <img src={props.post.music.cover}></img>
      </div>
      <div className="">
        <div className="pl-4 text-lg text-navy">{props.post.music.name} {props.post.music.artist ?(' by ' + props.post.music.artist) :("")}</div>
        <div className="pl-4 text-navy">{props.post.caption}</div>

      </div>
      
    </div>
  );
};

export default Post;
