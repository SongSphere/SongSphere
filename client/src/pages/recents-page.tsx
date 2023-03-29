import { TMusicContent } from "../types/music-content";
import Session from "../session";
import fetchPostsByUsername from "../services/post/fetch-user-posts";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useState } from "react";
import { TPost } from "../types/post";
import { TUser } from "../types/user";
import LikeFeed from "../components/profile/likes-feed";

const RecentsPage = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [user, setUser] = useState<TUser | null>(null);
  const [song, setSong] = useState<TMusicContent | null>(null);
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);
  useEffect(() => {
    if (user) {
      fetchPostsByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="min-h-screen min-w-screen bg-lblue">
      <Navbar />
      <div className="flex items-center justify-center mt-5">
        <div className="w-4/5">
          <h1 className="text-4xl text-white">
            Recently Played from{" "}
            {Session.getMusicService().replace("s", "S").replace("a", "A")}
          </h1>
          <LikeFeed posts={posts} user={user} setSong={setSong} />
        </div>
      </div>
    </div>
  );
};
export default RecentsPage;
