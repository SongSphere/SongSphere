import { TPost } from "../types/post";

const fetchUserPosts = async (email: string) => {
  return new Promise<TPost[]>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/posts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
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

export default fetchUserPosts;
