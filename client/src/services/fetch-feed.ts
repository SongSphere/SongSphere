import { TPost } from "../types/post";

const fetchFeed = async (num: number) => {
  return new Promise<TPost[]>(async (resolve, reject) => {
    let posts: TPost[] = [];

    await fetch(`${process.env.REACT_APP_API}/user/feed/${num}`, {
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
        posts.push(...(data.posts as TPost[]));
        resolve(posts);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export default fetchFeed;
