import { TPost } from "../../types/post";

const fetchPostsByUsername = async (username: string) => {
  return new Promise<TPost[]>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/posts/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then(async (data) => {
        resolve(data.posts);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchPostsByUsername;
