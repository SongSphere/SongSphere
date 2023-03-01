import { TPost } from "../types/post";

export const getPosts = async () => {
  await fetch(`${process.env.REACT_APP_API}/api/getpostsofuser`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email: "dominicdanborn@gmail.com",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status != 201) {
      console.error(res);
      return false;
    }
    console.log("success");
    console.log(res.json());
    return true;
  });
};
