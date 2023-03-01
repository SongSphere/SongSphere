import { TPost } from "../types/post";
import Post from "../components/post";

interface IProfileFeedProps {
  posts: TPost[];
}

const ProfileFeed = (props: IProfileFeedProps) => {
  console.log(props);
  return (
    <div className="flex justify-center mt-8">
      <div className="w-full">
        {props.posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
};

export default ProfileFeed;
