import React from "react";
import { TPost } from "../../types/post";
import sendPost from "../../services/post/send-post";

interface RepostProps {
    post: TPost;
  }

const Repost = (props:RepostProps) => {
    
    const newPost: TPost = {
        username: props.post.username,
        userEmail: props.post.userEmail,
        caption: props.post.caption ,
        music: props.post.music,
        likes: '0',
      };
    return (
        <div>
            <button className="absolute bottom-2 text-lblue hover:text-navy right-10" onClick={()=>sendPost(newPost)}>
                Repost
            </button>
        </div>
    )
};
export default Repost