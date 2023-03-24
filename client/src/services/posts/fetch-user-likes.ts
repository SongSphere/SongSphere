import { TUser } from "../../types/user";

const fetchLikesByUsername = async (username: string) => {
    return new Promise<String[]>(async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/api/user/fetchLikedPosts`, {
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
  
  export default fetchLikesByUsername;