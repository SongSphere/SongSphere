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
    const [posts, setPosts] = useState<String[]>([]);
    const [user, setUser] = useState<TUser | null>(null);
    const [tpost, setTpost ] = useState<TPost[]>([]);
    const [song, setSong] = useState<TMusicContent | null>(null);
    let ids:TPost[];
    useEffect(() => {
        setUser(Session.getUser());
      }, [Session.getUser()]);
      useEffect(() => {
        if (user) {
          fetchLikesByUsername(user.username).then((posts) => {
            setPosts(posts);
          }).then(() => {
            for(let i = 0; i < posts.length; i++) {
              if(posts[i]) {
                fetchPostById(posts[i].toString()).then((tposts) => {
                  ids.push(tposts);
                });
                setTpost(ids);
              }
            }
          });
          
        }
      }, [user]);
      if (!user) {
        return <div>fetching user</div>;
      }
      
    return (
        <div className="w-screen h-screen text-center bg-lblue">
            <h1 className="text-4xl text-white">Liked Posts</h1>
            <div>
                <LikeFeed user={user} posts={tpost} setSong={setSong}/>
            </div>
        </div>
    )
};
export default LikesPage
