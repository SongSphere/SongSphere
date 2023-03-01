import { TPost } from "../types/post";
import { TUser } from "../types/user";

export const UPosts = async (user: TUser | null) => {
    const list: TPost[] = [];
    if(user === null) return list;
  await fetch(`${process.env.REACT_APP_API}/api/getpostsofuser`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email: user.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const list: TPost[] =Object.values(res);
    return list;
  });
};