import { TPost } from "../../types/post";

export const fetchPlaylist = (username: string) => {
  return new Promise<TPost[]>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/playlist/${username}`, {
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
        console.log(data);
        // posts.push(...(data.posts as TPost[]));
        resolve(data.posts as TPost[]);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
