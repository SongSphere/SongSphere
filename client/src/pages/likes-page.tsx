import { TPost } from "../types/post";
import { useState } from "react";
import { useEffect } from "react";
import { TUser } from "../types/user";
import Session from "../session";
import fetchLikesByUsername from "../services/posts/fetch-user-likes";
import fetchPostById from "../services/post/fetch-post-by-id";


const LikesPage = () => {
    const [posts, setPosts] = useState<String[]>([]);
    const [user, setUser] = useState<TUser | null>(null);
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
    return (
        <div className="w-screen h-screen text-center bg-lblue">
            <h1 className="text-4xl text-white">Liked Posts</h1>
            <div>
                
            </div>
        </div>
    )
};
export default LikesPage
