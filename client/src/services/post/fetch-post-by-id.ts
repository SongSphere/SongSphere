import { TPost } from "../../types/post";

const fetchPostById = async (id: string) => {
  return new Promise<TPost>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/post/${id}`, {
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
        const post = data.post as TPost;
        resolve(post);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchPostById;
