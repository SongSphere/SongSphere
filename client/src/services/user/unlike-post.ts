import { TPost } from "../../types/post";

const UnlikePost = async (post: TPost) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/api/user/updateLikePost`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              postId: post._id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
       
    }
};
export default UnlikePost;