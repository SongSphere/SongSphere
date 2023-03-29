import { TUser } from "../../types/user";
import { TPost } from "../../types/post";

const fetchLikesByUsername = async (username: string) => {
    return new Promise<TPost[]>(async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/api/user/fetchLikedPosts/${username}`, {
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
          resolve(data.likes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export default fetchLikesByUsername;