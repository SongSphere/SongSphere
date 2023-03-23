import { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import fetchFeed from "../../services/fetch-feed";
import Post from "../post/post";
import { TMusicContent } from "../../types/music-content";

interface IFeedProps {
  setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
  //   setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

const Feed = (props: IFeedProps) => {
  const [posts, setPosts] = useState<TPost[]>();
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    fetchFeed(pageNum).then((posts) => {
      setPosts(posts);
    });
  }, []);

  if (!posts) {
    return <div>fetching posts</div>;
  }

  return (
    <div>
      {posts.map((post) => {
        return <Post post={post} key={post._id} setSong={props.setSong} />;
      })}
    </div>
  );
};

export default Feed;
