import { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import fetchFeed from "../../services/fetch-feed";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import Repost from "../post/repost";

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
    <div>
      {posts.map((post) => {
        const repost = post.repost;

        if (repost) {
          return (
            <Post
              post={post}
              key={post._id}
              setSong={props.setSong}
              user={props.user}
            />
          );
        } else {
          return <Repost post={post} key={post._id} setSong={props.setSong} />;
        }
      })}
      <button
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
  );
};

export default Feed;
