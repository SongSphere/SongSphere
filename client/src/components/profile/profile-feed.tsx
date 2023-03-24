import { TPost } from "../../types/post";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

interface IProfileFeedProps {
  posts: TPost[];
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const ProfileFeed = (props: IProfileFeedProps) => {
  return (
    <div className="justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return (
            <Post
              post={post}
              key={post._id}
              setSong={props.setSong}
              user={props.user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileFeed;
