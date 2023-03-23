import { TPost } from "../types/post";

const fetchFeed = async (num: number) => {
  let posts: TPost[] = [];

  // await fetch(`${process.env.REACT_APP_API}/api/user/getFeed`, {
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
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(posts);
  return posts;
};

export default fetchFeed;
