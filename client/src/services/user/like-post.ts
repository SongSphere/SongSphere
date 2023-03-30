import { TPost } from "../../types/post";

const LikePost = async (id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/user/updateLikePost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        postId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
};

export default LikePost;
