import { TPost } from "../types/post";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import fetchPostById from "../services/post/fetch-post-by-id";
import { useState } from "react";



const RepostPage = () => {
    const [post, setPost] = useState<TPost | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
          fetchPostById(id).then((post) => {
            setPost(post);
          });
        }
      }, []); 
      if (!post) {
        return <div>fetching post</div>;
      }
    return (
        <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
            <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 mt-10 rounded-lg bg-lgrey">
                <div className="col-span-2 text-center rounded-lg">
                    {post.music.name}
                    {post.music.artist ? " by " + post.music.artist : ""}
                    
                           
                </div>
            </div>
        </div>
    );
};
export default RepostPage