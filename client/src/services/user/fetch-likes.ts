import { rejects } from "assert";
import { resolve } from "path";
import { TPost } from "../../types/post";

const fetchLikes = async (id: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/user/fetchIsLiked/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      return res.json();
    })
    .then((data) => {
      const likes = data.likes as boolean;
      resolve(likes);
    })
    .catch((error) => {
      reject(error);
    });
  });
  
};
export default fetchLikes