import { TPost } from "../../types/post";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import Repost from "../post/repost";

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
          const repost = post.repost;

          if (repost) {
            return (
              <Repost post={post} key={post._id} setSong={props.setSong} />
            );
          } else {
            return (
              <Post
                post={post}
                key={post._id}
                setSong={props.setSong}
                user={props.user}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProfileFeed;
