import { TPost } from "../../types/post";

const likePost = async (postId: string, email: string) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/api/updateLikepost`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              postId: postId,
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
        
    }
};
export default likePost;
