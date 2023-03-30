import { TComment } from "../../types/comment";

const unLikeComment = async (id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/post/updateUnlikeComment`, {
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

export default unLikeComment;
