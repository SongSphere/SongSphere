import { TPost } from "../types/post";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import fetchPostById from "../services/post/fetch-post-by-id";
import { useState } from "react";
const [caption, setCaption] = useState<string>("");


const RepostPage = () => {
    const [post, setPost] = useState<TPost | null>(null);
    const [caption, setCaption] = useState<string>("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
          fetchPostById(id).then((post) => {
            setPost(post);
            setCaption(post.caption);
          });
        }
      }, []); 
    return (
        <div className="w-screen h-screen bg-navy">
            <div>
                {post?.caption}
            </div>
        </div>
    );
};
export default RepostPage