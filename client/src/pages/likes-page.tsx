import { TPost } from "../types/post";
import { useState } from "react";
import { useEffect } from "react";
import { TUser } from "../types/user";
import Session from "../session";
import fetchLikesByUsername from "../services/post/fetch-user-likes";
import fetchPostById from "../services/post/fetch-post-by-id";
import LikeFeed from "../components/profile/likes-feed";
import { TMusicContent } from "../types/music-content";
import Navbar from "../components/navbar";

const LikesPage = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [user, setUser] = useState<TUser | null>(null);
  const [song, setSong] = useState<TMusicContent | null>(null);
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);
  useEffect(() => {
    if (user) {
      fetchLikesByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen text-center min-w-screen bg-lblue">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-4/5">
          <h1 className="text-4xl text-center text-white">Liked Posts</h1>
          <LikeFeed user={user} posts={posts} setSong={setSong} />
        </div>
      </div>
    </div>
  );
};
export default LikesPage;
