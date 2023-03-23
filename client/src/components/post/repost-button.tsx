import React from "react";
import { TPost } from "../../types/post";
import sendPost from "../../services/post/send-post";
import { useNavigate } from "react-router-dom";

interface RepostProps {
    post: TPost;
    setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  }

const Repost = (props:RepostProps) => {
    
    const newPost: TPost = {
        username: props.post.username,
        userEmail: props.post.userEmail,
        caption: props.post.caption ,
        music: props.post.music,
        likes: '0',
      };
      let navigate = useNavigate();
    return (
        <div>
            <button className="absolute bottom-2 text-lblue hover:text-navy right-10" 
            onClick={()=>{
                props.setPost(props.post);
                navigate(`/repost/${props.post._id}`);
                }}>
                Repost
            </button>
        </div>
    )
};
export default Repost