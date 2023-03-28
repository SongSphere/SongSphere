import { TPost } from "../types/post";
import { useState } from "react";
import { useEffect } from "react";
import { TUser } from "../types/user";
import Session from "../session";
import fetchLikesByUsername from "../services/posts/fetch-user-likes";
import fetchPostById from "../services/post/fetch-post-by-id";
import LikeFeed from "../components/profile/likes-feed";
import { TMusicContent } from "../types/music-content";

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
          })
          
        }
      }, [user]);
      
      if (!user) {
        return <div>fetching user</div>;
      }
      
    return (
        <div className="w-full h-full min-h-screen text-center min-w-screen bg-lblue">
          <h1 className="text-4xl text-center text-white">Liked Posts</h1>
            <div className="grid grid-cols-4 gap-7 md:grid-flow-col">
              <div className="col-span-2 col-start-2">
                  <LikeFeed user={user} posts={posts} setSong={setSong}/>
              </div>
            </div>
        </div>
    )
};
export default LikesPage
