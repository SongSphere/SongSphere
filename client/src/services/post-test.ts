import { TPost } from "../types/post";

let somePost: TPost = {
  id: "63fe6b78062f504ec38f864e",
  username: "HELLLLLLLO",
  userEmail: "dominicdanborn@gmail.com",
  caption: "I have no idea what i am doing",
  music: {
    name: "Poetic Justice",
    artist: "Kendrick Lamar",
    albumName: "Good Kid Maad City",
    id: "1234",
    service: "spotify",
    category: "song",
  },
};

export const createPost = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/makepost`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      post: somePost,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log(res.json());
    return true;
  });
};

export const editPost = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/editPost`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      post: somePost,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log(res.json());
    return true;
  });
};

export const removePost = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/removePost`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      post: somePost,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log(res.json());
    return true;
  });
};
