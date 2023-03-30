import { TComment } from "../../types/comment";

const likeComment = async (id: string) => {
  await fetch(`${process.env.REACT_APP_API}/api/user/updateLikeComment`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
};

export default likeComment;
