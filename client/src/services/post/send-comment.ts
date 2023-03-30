import { TComment } from "../../types/comment";

const sendComment = async (
  comment: TComment,
  postId: string,
  replyingTo: string
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/post/comment`, {
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
    })
      .then((res) => {
        if (res.status == 201) {
          resolve(true);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(false);
      });
  });
};

export default sendComment;
