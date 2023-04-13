import { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import Repost from "../post/repost";
import fetchFeed from "../../services/user/fetch-feed";

interface IFeedProps {
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  user: TUser;
}

const Feed = (props: IFeedProps) => {
  const [posts, setPosts] = useState<TPost[]>();
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    fetchFeed(pageNum).then((posts) => {
      setPosts(posts);
      setPageNum(0);
    });
  }, []);

  if (!posts) {
    return <div>fetching posts</div>;
  }

  if (posts.length === 0) {
    return <div>there is no posts made by your follwers</div>;
  }

  return (
    <div className="p-4 bg-slate-900">
      {posts.map((post) => {
        const repost = post.repost;

        if (repost) {
          return (
            <Repost
              user={props.user}
              post={post}
              key={post._id}
              setSong={props.setSong}
            />
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
      <div className="flex justify-center">
        <button
          className="px-4 py-2 font-bold duration-300 bg-teal-100 border-2 rounded-lg border-slate-800 hover:bg-teal-200"
          onClick={() => {
            fetchFeed(pageNum + 1).then((newPosts) => {
              setPosts(posts.concat(newPosts));
              setPageNum(pageNum + 1);
            });
          }}
        >
          fetch more
        </button>
      </div>
    </div>
  );
};

export default Feed;
