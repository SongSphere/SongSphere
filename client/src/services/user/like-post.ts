import { TPost } from "../../types/post";

const LikePost = async (id: string | undefined) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/user/updateLikePost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
};

export default LikePost;
