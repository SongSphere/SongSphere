import { TComment } from "../../types/comment";

const sendComment = async (
  comment: TComment,
  postId: string,
  replyingTo: string
) => {
  await fetch(`${process.env.REACT_APP_API}/api/post/comment/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      comment: comment,
      postId: postId,
      replyingTo: replyingTo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
};

export default sendComment;
