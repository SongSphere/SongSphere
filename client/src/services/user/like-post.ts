import { TPost } from "../../types/post";

const LikePost = async (post: TPost, email: string) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/api/user/updateLikePost`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              postId: post._id,
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
       
    }
};
export default LikePost;
