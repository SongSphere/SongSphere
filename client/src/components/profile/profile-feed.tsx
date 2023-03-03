import { TPost } from "../../types/post";
import Post from "../post";
import { TMusicContent } from "../../types/music-content";

interface IProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>
}

const ProfileFeed = (props: IProfileFeedProps) => {
  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return <Post post={post} key={post._id} setSong={props.setSong} setPost={props.setPost} setSelectEditPost={props.setSelectEditPost}/>;
        })}
      </div>
      
    </div>
  );
};

export default ProfileFeed;
