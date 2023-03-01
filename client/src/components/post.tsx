import { TMusicContent } from "../types/music-content";
import { TPost } from "../types/post";

interface IPostProps {
  post: TPost;
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
}

const Post = (props: IPostProps) => {
  return (
    <div className="flex w-full p-6 mb-8 bg-white">
      <div
        className="w-32 h-32 cursor-pointer"
        onClick={() => {
          props.setSong(props.post.music);
        }}
      >
        <img src={props.post.music.cover}></img>
      </div>
      <div className="">
        <div className="pl-4">{props.post.music.name}</div>
        <div className="pl-4">{props.post.caption}</div>
      </div>
    </div>
  );
};

export default Post;
