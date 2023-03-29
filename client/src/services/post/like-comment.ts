import { TComment } from "../../types/comment";

const likeComment = async (comment: TComment) => {
  await fetch(`${process.env.REACT_APP_API}/api/user/updateLikeComment`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      comment: comment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {

    console.log(error);
  });
};

export default likeComment;
