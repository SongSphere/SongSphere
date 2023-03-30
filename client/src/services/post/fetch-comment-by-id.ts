import { TComment } from "../../types/comment";

const fetchCommentById = async (id: string) => {
  return new Promise<TComment>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/post/getComment/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data.comment as TComment);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchCommentById;
