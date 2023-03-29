import { TComment } from "../../types/comment";

const fetchComments = async (id: string) => {
  let comments: TComment[] = [];
  await fetch(`${process.env.REACT_APP_API}/api/post/getComments/${id}`, {
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
      comments.push(...(data.comments as TComment[]));
    })
    .catch((error) => {
      console.log(error);
    });
  return comments;
};

export default fetchComments;
